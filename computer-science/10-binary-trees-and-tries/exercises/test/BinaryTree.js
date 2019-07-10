const expect = require('chai').expect;
const { BinaryNode, BinaryTree } = require('../binaryTree');

describe('BinaryNode', ()=>{
    it('should initialize with null left and right pointers', ()=>{
        const newNode = new BinaryNode(5);
        expect(newNode.left).to.equal(null);
        expect(newNode.right).to.equal(null);
    })
})

describe('BinaryTree', ()=>{
    it('should initialize with a null root', ()=>{
        const tree = new BinaryTree();
        expect(tree.root).to.equal(null);
        expect(tree.root).to.not.be.undefined;
    });
    it('should place the first node as the root', ()=>{
        const tree = new BinaryTree();
        tree.insert(5);
        expect(tree.root.data).to.equal(5);
        expect(tree.root.left).to.equal(null);
        expect(tree.root.right).to.equal(null);
    });
    it('should place new nodes according to Binary Tree rules', ()=>{
        const tree = new BinaryTree();
        tree.insert(5);
        tree.insert(7);
        expect(tree.root.right.data).to.equal(7);
        expect(tree.root.left).to.equal(null);
        tree.insert(3);
        expect(tree.root.left.data).to.equal(3);
        tree.insert(1);
        expect(tree.root.left.left.data).to.equal(1);
        tree.insert(4);
        expect(tree.root.left.right.data).to.equal(4);
        tree.insert(9);
        expect(tree.root.right.right.data).to.equal(9);
        tree.insert(6);
        expect(tree.root.right.left.data).to.equal(6);
    });
    it('should return true when searching for existing values', ()=>{
        const tree = new BinaryTree();
        tree.insert(5);
        tree.insert(7);
        tree.insert(3);
        tree.insert(1);
        tree.insert(8);
        tree.insert(6);
        tree.insert(2);
        tree.insert(4);
        for(let i = 1; i < 9; i++){
            expect(tree.search(i)).to.be.true;
        }
    });
    it('should return false when searching for non-existent values', ()=>{
        const tree = new BinaryTree();
        for(let i = 1; i < 9; i++){
            tree.insert(i);
        }
        expect(tree.search(9)).to.be.false;
    });
    it('should calculate the size accurately', ()=>{
        const tree = new BinaryTree();
        expect(tree.size(tree.root)).to.equal(0);
        for(let i = 1; i < 9; i++){
            tree.insert(i);
        }
        expect(tree.size(tree.root)).to.equal(8);
    });
    it('should return the maximum value with getMax', ()=>{
        const tree = new BinaryTree();
        for(let i = 1; i < 9; i++){
            tree.insert(i);
        }
        expect(tree.getMax()).to.equal(8);
        tree.insert(9001);
        expect(tree.getMax()).to.equal(9001);
    });
    it('should return the correct height from a given node', ()=>{
        const tree = new BinaryTree();
        tree.insert(1);
        expect(tree.height()).to.equal(1);
        tree.insert(3);
        expect(tree.height()).to.equal(2);
        expect(tree.height(tree.root.right)).to.equal(1);
        tree.insert(5);
        expect(tree.height()).to.equal(3);
        expect(tree.height(tree.root.right)).to.equal(2);
        expect(tree.height(tree.root.right.right)).to.equal(1);
        expect(tree.height(tree.root.left)).to.equal(0);
    });
})