import binascii
import json
import logging
import os
from copy import deepcopy
from typing import List

import numpy as np
from anytree import NodeMixin, RenderTree
from form_fields import Att
from anytree.exporter import DotExporter
import pandas as pd
from anytree.exporter import JsonExporter
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import xgboost as xgb
from hyperopt import STATUS_OK, Trials, fmin, hp, tpe
from hyperopt.pyll import scope


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
        if children:  # set children only if given
            self.children = children


class PropertyEvaluationModel:
    _base_val: float = 0  # BASE VALUATION
    _val: float = 0  # ADDITIVE VALUATION
    input: dict
    _default_ppsqm = 16
    ppsqm = 16  # average price (euro) per square meter 2022 (NL)
    legal_occupy_sqm = 12  # (minimum) legal limit (m^2) occupancy space per person (NL)
    attributes = Att()
    sqm = 1
    node_set = {}
    nodes = {}
    dataset_apartments = None
    auxiliary_reg = None

    def __init__(self, apartments_ds_path, nodes_data_path):
        self.nodes_data = json.load(open(nodes_data_path, "r"))
        self.dataset_apartments = pd.read_csv(apartments_ds_path)
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

        self._fit_auxiliary_regressor(self.dataset_apartments)
        self._build_tree(self.nodes_data)

    def _fit_auxiliary_regressor(self, dataset):
        # load stored model if exists
        if os.path.exists("auxiliary_regressor.json"):
            self.logger.info("Loading auxiliary regressor from file...")
            self.auxiliary_reg = xgb.Booster()
            self.auxiliary_reg.load_model("auxiliary_regressor.json")
            return
        features = {'y': float}
        for node in self.nodes_data["nodes"]:
            features.update({ft['f']: ft['dtype'] for ft in node["FID"]})

        self.logger.info(f"Auxiliary regressor features: {features} ")
        dataset["y"] = dataset["y"] / dataset["area_m2"]

        dataset = dataset[features.keys()]
        # set all columns to categorical
        for col, dtype in features.items():
            dataset[col] = dataset[col].astype(dtype)
        # set y to float
        dataset["y"] = dataset["y"].astype(float)
        # separate X and y
        X = dataset.drop(columns=["y"])
        y = dataset["y"]
        # split train and test using sklearn
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.3, random_state=42)
        # xgboost random forest parameters
        params = {
            'tree_method': 'gpu_hist',
            'objective': 'reg:squarederror',
            'nthread': 4,
            'seed': 27,
            'max_cat_to_onehot': 6,
            'eta': 0.7,
            'max_depth': 6,
            'min_child_weight': 12,
            'subsample': 1,
            'colsample_bytree': 0.6,
            'gamma': 19,
            'lambda': 0.6,
            'num_parallel_tree': 167,


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

    def _build_tree(self, data):
        node_set, nodes = self.node_set, self.nodes
        for node_data in data["nodes"]:
            node_data["ID"] = str(node_data["ID"])
            node_set[node_data["ID"]] = node_data

        node_count = dict()

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
        leaves_ls = collect_leaves(nodes["0"], [])

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

        recursive_sub_interval_creation(data["value_distribution"], nodes["0"], 0)
        self.logger.info("Tree built successfully!")
        self.logger.info("Tree structure:")
        # for pre, fill, node in RenderTree(nodes["0"]):  # Assuming that the root node has the ID 0
        #     print(
        #         f"{pre}>({node.prev_choice}) = {node.value:0.2f} €") if len(
        #         node.children) == 0 else print(f"{pre}>({node.prev_choice})  {node.question} ")
        self.logger.info("Tree statistics:")
        self.logger.info("Total nodes: %d" % len(nodes))
        self.logger.info("Total leaf nodes: %d " % leaf_nodes_len)
        DotExporter(nodes["0"], graph='graph', indent=1,
                    nodenamefunc=lambda n: (str(n.question) + f" [{n.name[:8]}]") if n.question != "" else n.value,
                    nodeattrfunc=lambda _: "shape=box",
                    edgeattrfunc=lambda _, child: 'label="%s"' % child.prev_choice or "",
                    edgetypefunc=lambda _, __: "--").to_dotfile("tree.dot")
        JsonExporter(indent=2, sort_keys=True).write(nodes["0"], open("full_model.json", "w"))

    def _predict_reg_aux(self, features: list):
        """
        :param features: dictionary of features
        :type features: dict
        :return: valuation
        :rtype: float
        """

        def traverse(node, choices, reg_ft):
            if len(node.children) == 0:
                return node.value, reg_ft
            if len(choices) > 0:
                choice_ix = choices.pop(0)  # Pop the first answer
                for child in node.children:
                    if child.prev_choice_ix == choice_ix:  # If the child's value matches the answer
                        # add potential FID to the regression features
                        if node.fid:
                            for ft in node.fid:
                                reg_ft[ft['f']] = pd.Series([ft['o'][choice_ix]], dtype=ft['dtype'])
                                print(ft['f'])
                        return traverse(child, choices, reg_ft)

        # traverse the tree and collect the regression features
        valuation, reg_features = traverse(self.nodes["0"], features, pd.DataFrame())
        # create a dataframe from the regression features
        # create dmatrix
        reg_features = xgb.DMatrix(reg_features, enable_categorical=True)
        # predict the valuation
        pred = self.auxiliary_reg.predict(reg_features)[0]
        # change code below to logging module

        self.logger.info("--------------------------")
        self.logger.info("Main system valuation: %f" % valuation)
        self.logger.info("RF-Predicted valuation: %f" % pred)
        self.logger.info("Abs. difference: %f" % abs(valuation - pred))
        self.logger.info("Mean: %f " % np.mean([valuation, pred]))
        self.logger.info("--------------------------")
        return np.mean([valuation, pred])

    def forward(self, _input: List[int]):
        # collect nodes FIDs for regression
        return self._predict_reg_aux(_input)


if __name__ == "__main__":
    pem = PropertyEvaluationModel("../resources/999MD_apartments_processed.csv", "model.json")

    # dummy input
    _input = [0, 1, 0, 1, 0, 1, 1, 0, 1, 1]
    pem.forward(_input)
