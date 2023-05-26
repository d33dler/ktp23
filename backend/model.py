import binascii
import json
import os
from copy import deepcopy

from anytree import NodeMixin, RenderTree
from form_fields import Att
from anytree.exporter import DotExporter


class PEMNode(NodeMixin):  # NodeMixin makes this class become a tree node
    def __init__(self, name, question, options, parent=None, children=None, value=0):
        super(PEMNode, self).__init__()
        self.name = name
        self.question = question
        self.options = options
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

    def __init__(self, nodes_data):
        self.build_tree(nodes_data)

    def build_tree(self, nodes_dict):
        node_set, nodes = {}, {}
        for node_data in nodes_dict["nodes"]:
            node_data["ID"] = str(node_data["ID"])
            node_set[node_data["ID"]] = node_data

        def recursive_tree_gen(parent, _node: str, side: int):
            """

            :param parent:
            :type parent:
            :param _node:
            :type _node:
            :param side:  [0,1] left or right
            :type side: int
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
                nodes[node_id] = PEMNode(unique_node['ID'], unique_node['Q'], deepcopy(unique_node['OPTIONS']), parent)
            else:
                n = nodes[_node]
                node_id = n.name + '_' + binascii.b2a_hex(os.urandom(4)).decode("utf-8")
                nodes[node_id] = PEMNode(node_id, n.question, deepcopy(n.options), parent)

            if parent is not None:
                if side == 0:
                    parent.options[0][1] = node_id
                else:
                    parent.options[1][1] = node_id

            recursive_tree_gen(nodes[node_id], str(node_set[_node]['OPTIONS'][0][1]), 0)  # left
            recursive_tree_gen(nodes[node_id], str(node_set[_node]['OPTIONS'][1][1]), 1)  # right



        def set_values(_node, value):
            # If the node is a leaf node, set its value and return the updated value
            if not _node.children:
                _node.value = value
                return value * 0.9  # Decrease the value by 10%

            # If the node has children, recurse on the right child first
            if len(_node.children) == 2:
                value = set_values(_node.children[1], value)  # Right child

            # Then recurse on the left child
            value = set_values(_node.children[0], value)  # Left child

            return value

        recursive_tree_gen(None, "0", 0)
        set_values(nodes["0"], 8)
        print("Tree built successfully!")
        for pre, fill, node in RenderTree(nodes["0"]):  # Assuming that the root node has the ID 0
            if node.parent is not None:
                choice = node.parent.options[0][0] if node.parent.options[0][1] == node.name else node.parent.options[1][0]
            else: choice = "type"
            print(
                f"{pre}{node.question} ({choice}) - {node.value:0.2f} €") if len(
                node.children) == 0 else print(
                f"{pre}{node.question} ({choice})")
        print("Tree statistics:")
        print("Total nodes: ", len(nodes))
        print("Total leaf nodes: ", len([n for n in nodes.values() if len(n.children) == 0]))
        DotExporter(nodes["0"]).to_picture("tree.png")

    def forward(self, _input):
        for node_id in _input:
            pass
            # get node FID, identify response
            # get node value
        return None


if __name__ == "__main__":
    nodes_data = json.load(open("model.json", "r"))
    pem = PropertyEvaluationModel(nodes_data)
