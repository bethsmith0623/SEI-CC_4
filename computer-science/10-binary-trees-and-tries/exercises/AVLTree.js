class Node {
    constructor(){
    // a node has data, left, and right pointers
    // a node also has a height property that starts at 1
    // left and right are intialized as null
    }
}
class AVLTree {
    constructor(){
        // when a new Tree is made, it has a root property
    }
    insert(data){
        // add a new Node to the tree, with data as the Node's data
        // insertion starts the same way as in a regular Binary Tree
        // once the node is inserted, however, check the heights for imbalance
        // if the new node causes imbalance, perform rotations to rebalance
    }
    setHeight(node){
        // calculate and set the height property of the given node
        // the height is the maximum between the left and right children heights plus 1
        // the height of a node without any further nodes is 1
    }
    rotateRight(node){
        // rotate the given node to the right
    }
    rotateLeft(node){
        // rotate the given node to the left
    }
}

module.exports = {
    Node,
    AVLTree
}