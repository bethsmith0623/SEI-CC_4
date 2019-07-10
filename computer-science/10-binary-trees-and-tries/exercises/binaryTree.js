class BinaryNode {
    constructor(){
    // a node has data, left, and right pointers
    // left and right are intialized as null
    }
}
class BinaryTree {
    constructor(){
        // when a new Tree is made, it has a root property
    }
    insert(data){
        // add a new Node to the tree, with data as the Node's data
        // if the data is already in the tree, do not insert it
    }
    search(val){
        // search the Tree for a node with the given value
        // if the node exists, return it
        // if the node doesn't exist, return false
    }
    size(node){
        // calculate the number of nodes in the tree, starting from the given node
    }
    getMax(){
        // return the maximum value stored in the tree
    }
    height(node){
        // calculate the maximum amount of nodes in any one path from the given node
        // if not given a specific node, default to using the root node
    }
    isBalanced(node){
        // return true or false based on whether the sub-tree starting at the given node is balanced
        // A tree is imbalanced if the height of one branch exceeds the other side by more than one level
        // A tree is balanced if all branches end within one level of each other.
    }
}

module.exports = {
    BinaryNode,
    BinaryTree
}