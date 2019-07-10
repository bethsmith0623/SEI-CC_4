const expect = require('chai').expect;
const { Node, AVLTree } = require('../AVLTree');

describe('Node', ()=>{
    it('should initialize with null left and right pointers and 1 height', ()=>{
        let newNode = new Node(5);
        expect(newNode.left).to.equal(null);
        expect(newNode.right).to.equal(null);
        expect(newNode.height).to.equal(1);
    })
})

describe('AVLTree', ()=>{
    it('should initialize with a null root', ()=>{
        let tree = new AVLTree();
        expect(tree.root).to.equal(null);
        expect(tree.root).to.not.be.undefined;
    });
    it('should place the first node as the root', ()=>{
        let tree = new AVLTree();
        tree.insert(5);
        expect(tree.root.data).to.equal(5);
        expect(tree.root.left).to.equal(null);
        expect(tree.root.right).to.equal(null);
        expect(tree.root.height).to.equal(1);
    });
    it('should automatically fix a right right imbalance', ()=>{
        let tree = new AVLTree();
        tree.insert(5);
        tree.insert(7);
        expect(tree.root.right.data).to.equal(7);
        expect(tree.root.left).to.equal(null);
        tree.insert(9);
        // rotations should happen to fix the tree
        expect(tree.root.left.data).to.equal(5);
        expect(tree.root.right.data).to.equal(9);
        expect(tree.root.data).to.equal(7);
        expect(tree.root.height).to.equal(2);
        expect(tree.root.left.height).to.equal(1);
        expect(tree.root.right.height).to.equal(1);
    });
    it('should automatically fix a right left imbalance', ()=>{
        let tree = new AVLTree();
        tree.insert(5);
        tree.insert(7);
        expect(tree.root.right.data).to.equal(7);
        expect(tree.root.left).to.equal(null);
        tree.insert(6);
        // rotations should happen to fix the tree
        expect(tree.root.left.data).to.equal(5);
        expect(tree.root.right.data).to.equal(7);
        expect(tree.root.data).to.equal(6);
        expect(tree.root.height).to.equal(2);
        expect(tree.root.left.height).to.equal(1);
        expect(tree.root.right.height).to.equal(1);
    });
    it('should automatically fix a left left imbalance', ()=>{
        let tree = new AVLTree();
        tree.insert(5);
        tree.insert(3);
        expect(tree.root.right.data).to.equal(null);
        expect(tree.root.left).to.equal(3);
        tree.insert(1);
        // rotations should happen to fix the tree
        expect(tree.root.left.data).to.equal(1);
        expect(tree.root.right.data).to.equal(5);
        expect(tree.root.data).to.equal(3);
        expect(tree.root.height).to.equal(2);
        expect(tree.root.left.height).to.equal(1);
        expect(tree.root.right.height).to.equal(1);
    });
    it('should automatically fix a left right imbalance', ()=>{
        let tree = new AVLTree();
        tree.insert(5);
        tree.insert(3);
        expect(tree.root.right.data).to.equal(null);
        expect(tree.root.left).to.equal(3);
        tree.insert(4);
        // rotations should happen to fix the tree
        expect(tree.root.left.data).to.equal(3);
        expect(tree.root.right.data).to.equal(5);
        expect(tree.root.data).to.equal(4);
        expect(tree.root.height).to.equal(2);
        expect(tree.root.left.height).to.equal(1);
        expect(tree.root.right.height).to.equal(1);
    });
})