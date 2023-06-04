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
        self.options = options
        self.fid = fid
        self.parent = parent
        self.value = value
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

    def build_tree(self, nodes_dict):
        node_set, nodes = self.node_set, self.nodes
        for node_data in nodes_dict["nodes"]:
            node_data["ID"] = str(node_data["ID"])
            node_set[node_data["ID"]] = node_data

        def recursive_tree_gen(parent, _node: str, child_ix: int):
            """

            :param parent:
            :type parent:
            :param _node:
            :type _node:
            :param child_ix:  [0,1] left or right
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
                nodes[node_id] = PEMNode(unique_node['ID'], unique_node['Q'], deepcopy(unique_node['OPTIONS']),
                                         unique_node['FID'], parent)
            else:
                n = nodes[_node]
                node_id = n.name + '_' + binascii.b2a_hex(os.urandom(4)).decode("utf-8")
                nodes[node_id] = PEMNode(node_id, n.question, deepcopy(n.options), n.fid, parent)

            if parent is not None:
                parent.options[child_ix][1] = node_id
            for ix, opt in enumerate(node_set[_node]['OPTIONS']):
                recursive_tree_gen(nodes[node_id], str(opt[1]), ix)

        def collect_leaves(_node, leaf_ls):
            # If the node is a leaf node, set its value and return the updated value
            if not _node.children:
                leaf_ls.append(_node)
                return leaf_ls
            for child in _node.children:
                collect_leaves(child, leaf_ls)
            return leaf_ls

        recursive_tree_gen(None, "0", 0)
        leaf_nodes_len = len([n for n in nodes.values() if len(n.children) == 0])
        distributed_valuation = np.concatenate(
            [np.linspace(3, 15, leaf_nodes_len // 2)[::-1], np.linspace(3, 15, leaf_nodes_len // 2)[::-1]])
        print(distributed_valuation)
        leaves_ls = collect_leaves(nodes["0"].children[0], [])
        for i, leaf in enumerate(leaves_ls):
            leaf.value = distributed_valuation[i]
        print("Tree built successfully!")
        for pre, fill, node in RenderTree(nodes["0"]):  # Assuming that the root node has the ID 0
            if node.parent is not None:
                choice = node.options[0][0] if node.parent.options[0][1] == node.name else \
                    node.options[1][0]
            else:
                choice = "type"
            print(
                f"{pre}{node.question} ({choice}) - {node.value:0.2f} €") if len(
                node.children) == 0 else print(f"{pre}{node.question} ({choice})")
        print("Tree statistics:")
        print("Total nodes: ", len(nodes))
        print("Total leaf nodes: ", leaf_nodes_len)
        DotExporter(nodes["0"]).to_picture("tree.png")
        JsonExporter(indent=2, sort_keys=True).write(nodes["0"], open("full_model.json", "w"))

    def forward(self, _input):
        # collect nodes FIDs for regression
        fids = []
        for node_id in _input:
            fids.append(self.nodes[node_id].fid)
        return None


if __name__ == "__main__":
    nodes_data = json.load(open("model.json", "r"))
    pem = PropertyEvaluationModel(None, nodes_data)
