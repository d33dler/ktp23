import binascii
import json
import os
from copy import deepcopy
import numpy as np
from anytree import NodeMixin, RenderTree
from form_fields import Att
from anytree.exporter import DotExporter
import pandas as pd
from anytree.exporter import JsonExporter


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

    def __init__(self, apartments_ds_path, nodes_data):
        # self.dataset_apartments = pd.read_csv(apartments_ds_path)
        self.build_tree(nodes_data)

    def build_tree(self, data):
        node_set, nodes = self.node_set, self.nodes
        for node_data in data["nodes"]:
            node_data["ID"] = str(node_data["ID"])
            node_set[node_data["ID"]] = node_data

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
                node_id = _node
                unique_node = node_set[_node]
                new_node = PEMNode(unique_node['ID'], unique_node['Q'], deepcopy(unique_node['OPTIONS']),
                                   unique_node['FID'], parent)
            else:
                n = nodes[_node]
                node_id = node_set[_node]['ID'] + '_' + binascii.b2a_hex(os.urandom(16)).decode("utf-8")
                new_node = PEMNode(node_id, n.question, deepcopy(n.options_raw), n.fid, parent)

            new_node.prev_choice = prev_choice
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
        print("Tree built successfully!")
        print("Tree structure:")
        for pre, fill, node in RenderTree(nodes["0"]):  # Assuming that the root node has the ID 0
            print(
                f"{pre}>({node.prev_choice}) = {node.value:0.2f} €") if len(
                node.children) == 0 else print(f"{pre}>({node.prev_choice})  {node.question} ")
        print("Tree statistics:")
        print("Total nodes: ", len(nodes))
        print("Total leaf nodes: ", leaf_nodes_len)
        DotExporter(nodes["0"]).to_picture("tree.png")
        JsonExporter(indent=2, sort_keys=True).write(nodes["0"], open("full_model.json", "w"))

    def _curve_fit(self, features: dict):
        """
        :param features: dictionary of features
        :type features: dict
        :return: valuation
        :rtype: float
        """
        pass

    def forward(self, _input):
        # collect nodes FIDs for regression
        features = {}
        for node_id, val in _input.items():
            features[node_id] = self.nodes[node_id]
        return self._curve_fit(features)


if __name__ == "__main__":
    nodes_data = json.load(open("model.json", "r"))
    pem = PropertyEvaluationModel(None, nodes_data)
