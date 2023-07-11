import binascii
import json
import logging
import os
import pickle
from copy import deepcopy
from dataclasses import dataclass
from typing import List, Dict
import numpy as np
from anytree import NodeMixin, RenderTree
from pandas._libs.parsers import CategoricalDtype
from form_fields import Att
from anytree.exporter import DotExporter
import pandas as pd
from anytree.exporter import JsonExporter
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import xgboost as xgb
from hyperopt import STATUS_OK, Trials, fmin, hp, tpe
from hyperopt.pyll import scope
from scipy.optimize import curve_fit
from anytree import Node, RenderTree, findall, Walker
import statsmodels.formula.api as smf

pd.options.mode.chained_assignment = None  # default='warn'


class PEMNode(NodeMixin):  # NodeMixin makes this class become a tree node
    def __init__(self, name, question, options, fid, parent=None, children=None, value=0):
        super(PEMNode, self).__init__()
        self.name = name
        self.question = question
        self.options_raw = deepcopy(options)
        self.options = options
        self.fid = fid
        self.parent = parent
        self.value = value
        self.prev_choice = None
        self.prev_choice_ix = -1
        self.ols_coef: dict = None
        self.ols_model = None
        if children:  # set children only if given
            self.children = children


class PropertyEvaluationModel:
    sqm = 1
    node_set = {}
    nodes = {}
    tree = None
    dataset: pd.DataFrame = None
    auxiliary_reg: xgb.Booster | None = None
    ols_models: dict = {}

    def __init__(self, apartments_ds_path, nodes_data_path):
        self.model_cfg = json.load(open(nodes_data_path, "r"))
        self.dataset = pd.read_csv(apartments_ds_path)
        # create info logger object from logging module
        self.logger = logging.getLogger("PEM")
        # set logging level
        self.logger.setLevel(logging.INFO)
        # create console handler and set level to info
        handler = logging.StreamHandler()
        handler.setLevel(logging.INFO)
        # create formatter
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        # add formatter to handler
        handler.setFormatter(formatter)
        # add handler to logger
        self.logger.addHandler(handler)

        self._build_tree(self.model_cfg)
        self._fit_auxiliary_regressor(self.dataset)

    def _fit_auxiliary_regressor(self, dataset: pd.DataFrame):
        # load stored model if exists
        if os.path.exists("auxiliary_regressor.json"):
            self.logger.info("Loading auxiliary regressor from file...")
            self.auxiliary_reg = xgb.Booster()
            self.auxiliary_reg.load_model("auxiliary_regressor.json")
            return
        self.logger.info("Fitting auxiliary regressor...")
        features = {'y': float}
        for node in self.model_cfg["nodes"]:
            features.update({ft['f']: ft['dtype'] for ft in node["FID"]})

        self.logger.info(f"Auxiliary regressor features: \n {features} ")

        dataset = dataset[
            list(set(self.model_cfg["regressors"]).union(set(features.keys())).intersection(set(dataset.columns)))]
        dataset = dataset.dropna()

        # set all columns to categorical
        for col, dtype in features.items():
            try:
                dataset[col] = dataset[col].astype(dtype)
            except pd.errors.IntCastingNaNError:
                self.logger.warning(f"Could not convert column {col} to {dtype}")
        for col in dataset.columns:
            if dataset[col].dtype == "object":
                dataset[col] = dataset[col].astype("category")
        # set y to float
        dataset["y"] = dataset["y"].astype(float)
        # separate X and y
        X = dataset.drop(columns=["y"])
        y = dataset["y"]
        # split train and test using sklearn
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.3, random_state=42)
        # xgboost random forest parameters
        params = {
            'tree_method': 'hist',
            'objective': 'reg:squarederror',
            'nthread': 4,
            'seed': 33,
            'max_cat_to_onehot': 6,
            'eta': 0.7,
            'max_depth': 8,
            'min_child_weight': 5,
            'subsample': 1,
            'colsample_bytree': 0.8,
            'gamma': 5,
            'lambda': 0.5,
        }
        # search_space = {
        #     'eta': hp.quniform('eta', 0.2, 1, 0.1),
        #     'num_parallel_tree':  scope.int(hp.quniform('num_parallel_tree', 64, 256, 1)),
        #     'max_depth': scope.int(hp.quniform('max_depth', 6, 12, 1)),
        #     'min_child_weight': hp.quniform('min_child_weight', 0.1, 15, 1),
        #     'subsample': hp.quniform('subsample', 0.6, 1, 0.1),
        #     'colsample_bynode': hp.quniform('colsample_bytree', 0.6, 0.9, 0.1),
        #     'gamma': hp.quniform('gamma', 0, 20, 1),
        #     'lambda': hp.quniform('lambda', 0, 1, 0.1),
        # }
        # search_space.update(params)
        # def train_model(params):
        #     # create dmatrix
        #     dm = xgb.DMatrix(X_train, label=y_train, enable_categorical=True)
        #     # train model
        #     m = xgb.train(params, dm, num_boost_round=128, verbose_eval=False)
        #     # create test dmatrix
        #     dm_test = xgb.DMatrix(X_test, label=y_test, enable_categorical=True)
        #     # return loss
        #     return {
        #         'loss': np.mean(np.abs(m.predict(dm_test) - y_test)),
        #         'status': STATUS_OK,
        #         'model': m,
        #     }
        #
        # best_params = fmin(
        #     fn=train_model,
        #     space=search_space,
        #     algo=tpe.suggest,
        #     loss_threshold=0,
        #     max_evals=200,
        #     rstate=np.random.default_rng(33),
        # )
        # self.logger.info(f"Best parameters: {best_params} ")
        # params.update(best_params)

        dmatrix = xgb.DMatrix(X_train, label=y_train, enable_categorical=True)
        model = xgb.train(params, dmatrix, num_boost_round=90, evals=[(dmatrix, "train")])
        model.save_model("auxiliary_regressor.json")
        # create test dmatrix
        dmatrix_test = xgb.DMatrix(X_test, label=y_test, enable_categorical=True)
        self.logger.info(f"Mean absolute error: {np.mean(np.abs(model.predict(dmatrix_test) - y_test))} ")
        self.auxiliary_reg = model
        return model

    def _build_tree(self, data):
        self.logger.info("Building tree...")
        node_set, nodes = self.node_set, self.nodes
        for node_data in data["nodes"]:
            node_data["ID"] = str(node_data["ID"])
            node_set[node_data["ID"]] = node_data

        node_count = dict()
        self.dataset["y"] = self.dataset["y"] / self.dataset["area_m2"]

        def recursive_tree_gen(parent, _node: str, child_ix: int, prev_choice=None):
            """

            :param prev_choice:
            :type prev_choice:
            :param parent:
            :type parent:
            :param _node:
            :type _node:
            :param child_ix: index of the child in the parent's options
            :type child_ix: int
            :return:
            :rtype:
            """
            # base case
            if _node == "-1":
                return

            # recursive case
            if _node not in nodes:
                unique_node = node_set[_node]
                node_id = node_set[_node]['ID']
                new_node = PEMNode(node_id, unique_node['Q'], deepcopy(unique_node['OPTIONS']),
                                   unique_node['FID'], parent)
                node_count[_node] = 1
            else:
                n = nodes[_node]
                node_id = node_set[_node]['ID'] + '_' + str(node_count[_node])
                new_node = PEMNode(node_id, n.question, deepcopy(n.options_raw), n.fid, parent)
                node_count[_node] += 1

            new_node.prev_choice = prev_choice
            new_node.prev_choice_ix = child_ix
            nodes[node_id] = new_node

            if parent is not None:
                parent.options[child_ix][1] = node_id
            for z, o in enumerate(new_node.options_raw):
                recursive_tree_gen(nodes[node_id], str(o[1]), z, o[0])

        def collect_leaves(_node, leaf_ls):
            if not _node.children:
                leaf_ls.append(_node)
                return leaf_ls
            for child in _node.children:
                collect_leaves(child, leaf_ls)
            return leaf_ls

        recursive_tree_gen(None, "0", 0)
        leaf_nodes_len = len([n for n in nodes.values() if len(n.children) == 0])
        root = nodes["0"]
        self.tree = root
        leaves_ls = collect_leaves(root, [])

        def recursive_sub_interval_creation(_data, _node, idx):
            if _data["_node_"] is not None:
                for data_child, child in zip(_data["_node_"]["children"], nodes[_data["_node_"]["id"]].children):
                    idx = recursive_sub_interval_creation(data_child, child, idx)
                return idx
            else:
                st_idx = idx
                idx += len(collect_leaves(_node, []))
                interv = (idx - st_idx) // len(_data["_distributions_"])
                val_distribution = np.concatenate([np.linspace(d[0], d[1], interv) for d in _data["_distributions_"]])
                for lf_ix, lf in enumerate(leaves_ls[st_idx:idx]):
                    lf.value = val_distribution[lf_ix]
                return idx

        recursive_sub_interval_creation(data["value_distribution"], root, 0)

        # Traverse the tree to find all leaf nodes
        formula = "y ~ " + " + ".join(self.model_cfg["regressors"])

        def fit_model(df, _formula):
            return smf.ols(_formula, data=df).fit()

        def generate_paths(node_id, path):
            paths = []

            # Get node from model_cfg
            node = next((n for n in self.model_cfg["nodes"] if n["ID"] == str(node_id)), None)

            if node is None:
                raise ValueError(f"Node with ID {node_id} not found")

            # If node has options, then it is not a leaf node
            if node["OPTIONS"]:
                for idx, option in enumerate(node["OPTIONS"]):
                    new_path = path.copy()
                    new_path.append(idx)
                    paths += generate_paths(str(option[1]), new_path)
            else:
                paths.append(path)

            return paths

        @dataclass
        class Scenario:
            node_value: float
            feature_values: pd.Series()
            leaf: PEMNode

        def filter_data_for_scenario(_scenario: Scenario, df):
            filtered_df = df.copy()
            for column in _scenario.feature_values.columns:
                val = (_scenario.feature_values[column].astype(str) if _scenario.feature_values[
                                                                           column].dtype.name == 'category' else
                       _scenario.feature_values[column])[0]
                filtered_df = filtered_df.loc[filtered_df[column] == val, :]
            return filtered_df

        # 1. Generate all path scenarios
        # load OLS models if available
        ols_models_missing = False
        if os.path.exists(self.model_cfg["ols_model_path"]):
            with open(self.model_cfg["ols_model_path"], 'rb') as f:
                curve_params = pickle.load(f)

        else:
            ols_models_missing = True
            star_scenarios = generate_paths(0, [])  # will be same length as leaf_nodes_len
            star_scenarios = [Scenario(*argz) for argz in
                              [self._traverse(root, unique_path, pd.DataFrame()) for unique_path in star_scenarios]]
            # 2. Curve fitting for each scenario
            curve_params = {}
            self.logger.info("========== Fitting linear regression models ==========")
            for ix, scenario in enumerate(star_scenarios):
                filtered_data = filter_data_for_scenario(scenario, self.dataset)
                if (not filtered_data.empty) and len(filtered_data) >= self.model_cfg["reg_min_samples"]:
                    curve_params[scenario.leaf.name] = fit_model(filtered_data, formula)
        self.ols_models = curve_params
        self.logger.info("========== Model tree & OLS models built successfully! ==========")
        # curve_params now holds the linear regression coefficients for each possible scenario
        self.logger.info(f"Curve fitting completed successfully! Available sub-models: {len(curve_params)}")
        self.logger.info(f"Stray leaves: {leaf_nodes_len - len(curve_params)}")
        self.logger.info(f"Wrapping up...")
        # save curve_params as pickle
        if ols_models_missing:
            with open(self.model_cfg["ols_model_path"], "wb") as f:
                pickle.dump(curve_params, f, protocol=pickle.HIGHEST_PROTOCOL)
        # save model params (OLS coefficients into leaf nodes)
        for leaf in leaves_ls:
            leaf.ols_coef = curve_params.get(leaf.name, None)
            leaf.ols_coef = leaf.ols_coef.params.to_dict() if leaf.ols_coef is not None else None
        # self.logger.info("Tree structure:")
        # for pre, fill, node in RenderTree(nodes["0"]):  # Assuming that the root node has the ID 0
        #     print(
        #         f"{pre}>({node.prev_choice}) = {node.value:0.2f} €") if len(
        #         node.children) == 0 else print(f"{pre}>({node.prev_choice})  {node.question} ")
        self.logger.info("======================= Model statistics ========================")
        self.logger.info("Total nodes: %d" % len(nodes))
        self.logger.info("Total leaf nodes: %d " % leaf_nodes_len)
        DotExporter(nodes["0"], graph='graph', indent=1,
                    nodenamefunc=lambda n: (str(n.question) + f" [{n.name[:8]}]") if n.question != "" else n.value,
                    nodeattrfunc=lambda _: "shape=box",
                    edgeattrfunc=lambda _, child: 'label="%s"' % child.prev_choice or "",
                    edgetypefunc=lambda _, __: "--").to_dotfile("tree.dot")
        JsonExporter(indent=2, sort_keys=True).write(root, open("full_model.json", "w"))
        self.logger.info("Finished writing tree to file.")
        self.logger.info("================================================================")
        for leaf in leaves_ls:
            leaf.ols_model = curve_params.get(leaf.name, None)

    def _traverse(self, node, choices, reg_ft):
        if len(node.children) == 0:
            return node.value, reg_ft, node
        if len(choices) > 0:
            choice_ix = choices.pop(0)  # Pop the first answer
            for child in node.children:
                if child.prev_choice_ix == choice_ix:  # If the child's value matches the answer
                    # add potential FID to the regression features
                    if node.fid:
                        for ft in node.fid:
                            reg_ft[ft['f']] = pd.Series([ft['o'][choice_ix]], dtype=ft['dtype'])
                    return self._traverse(child, choices, reg_ft)

    def _predict(self, features: dict):
        """
        :param features: dictionary of features
        :type features: dict
        :return: valuation
        :rtype: float
        """

        # traverse the tree and collect the regression features
        valuation, reg_features, leaf = self._traverse(self.tree, features["idx"], pd.DataFrame())
        # create a dataframe from the regression features
        # create dmatrix
        extra = pd.DataFrame({k: [v] for k, v in features["extra"].items()})
        # drop columns in reg_features that appear in extra
        reg_features = reg_features.drop(columns=extra.columns, errors="ignore")
        # combine the two dataframes
        reg_features = pd.concat([reg_features, extra], axis=1, join="inner")
        reg_features = reg_features.reindex(columns=self.auxiliary_reg.feature_names)
        for col in reg_features.columns:
            if reg_features[col].dtype == "object":
                reg_features[col] = reg_features[col].astype("category")
        reg_features = xgb.DMatrix(reg_features, enable_categorical=True)
        # predict the valuation
        pred = self.auxiliary_reg.predict(reg_features)[0]
        # change code below to logging module
        ols_pred = leaf.ols_model.predict(extra)[0] if leaf.ols_model else None
        self.logger.info("--------------------------")
        self.logger.info("Main system linear valuation (expert supplied): %f" % valuation)
        self.logger.info("Main system regression estimation : %f" % ols_pred) if ols_pred else None
        self.logger.info("XGB-Predicted valuation: %f" % pred)
        self.logger.info("Abs. difference: %f" % abs(valuation - pred))
        self.logger.info("Mean: %f " % np.mean([valuation, pred]))
        self.logger.info("--------------------------")
        return np.mean([valuation, pred]) if ols_pred is None else np.mean([valuation, pred, ols_pred])

    def forward(self, _input: dict):
        # collect nodes FIDs for regression
        return self._predict(_input)

    def run_ols_statistics(self):
        """
        Run statistics on OLS models
        """

        # Assuming models is a list containing all your OLS models
        models = self.ols_models
        if models is None or len(models) == 0:
            self.logger.error("OLS models not found. Exiting...")
            return
        # Empty lists to hold the model statistics
        model_nums = []
        r_squareds = []
        adj_r_squareds = []
        f_pvalues = []
        log_likelihoods = []
        condition_numbers = []

        # Iterate over all models
        for i, model in enumerate(models.values()):
            model_nums.append(i)
            r_squareds.append(model.rsquared)
            adj_r_squareds.append(model.rsquared_adj)
            f_pvalues.append(model.f_pvalue)
            log_likelihoods.append(model.llf)
            condition_numbers.append(np.linalg.cond(model.model.exog))

        # Create a DataFrame with the model statistics
        df_stats = pd.DataFrame({
            'model_num': model_nums,
            'r_squared': r_squareds,
            'adj_r_squared': adj_r_squareds,
            'f_pvalue': f_pvalues,
            'log_likelihood': log_likelihoods,
            'condition_number': condition_numbers,
        })
        # Compute summary statistics for each column and pretty print them
        summary_statistics = df_stats.describe()
        print(df_stats.info())
        print(df_stats.head(50))
        print(summary_statistics.to_string())


if __name__ == "__main__":
    pem = PropertyEvaluationModel("../resources/999MD_apartments_processed.csv", "model.json")
    # input example
    _input = {'idx': [1, 2,1, 1, 1, 1, 1,1, 1, 1, 1],
              'extra': {
                  'dist_to_center': 5.8,
                  'floor': 5,
                  'area_m2': 70
              }}
    pem.forward(_input)
    pem.run_ols_statistics()