const expect = require('chai').expect;
const { HashTable } = require('../HashTable');

describe('hash table', ()=>{
    it('should initialize with a given table size', ()=>{
        let hashTable = new HashTable(5);
        expect(hashTable.table.length).to.equal(5);
    });
    it('should intialize a table full of null values', ()=>{
        let hashTable = new HashTable(3);
        hashTable.table.forEach((tableIndex)=>{
            expect(tableIndex).to.be.null;
        })
    });
    it('should return an integer key from hashing', ()=>{
        let hashTable = new HashTable(7);
        let hashResult = hashTable.hash("marmalade");
        expect(typeof hashResult).to.equal("number");
    });
    it("should create Linked Lists for inserting elements", ()=>{
        let hashTable = new HashTable(3);
        hashTable.insert("hashing time", "now");
        let found = false;
        hashTable.table.forEach((tableEntry)=>{
            if(tableEntry){
                expect(tableEntry.head.key).to.equal("hashing time");
                expect(tableEntry.head.value).to.equal("now")
                if(tableEntry.head.key === "hashing time" && tableEntry.head.value === "now"){
                    found = true;
                }
            }else{
                expect(tableEntry).to.be.null;
            }
        });
        expect(found).to.be.true;
    });
    it("should be able to successfully search for inserted elements", ()=>{
        let hashTable = new HashTable(3);
        hashTable.insert("hashing time", "now");
        const foundNode = hashTable.search("hashing time");
        expect(foundNode.value).to.equal("now");
    });
    it("should return -1 on unfound elements with search", ()=>{
        let hashTable = new HashTable(3);
        hashTable.insert("hashing time");
        const missingNode = hashTable.search("hash the planet");
        expect(missingNode).to.equal(-1);
    });
    it("should successfully delete and return elements", ()=>{
        let hashTable = new HashTable(3);
        hashTable.insert("hashing time", "now");
        hashTable.insert("red shirt", "my first mission");
        const casualty = hashTable.delete("red shirt");
        expect(casualty.key).to.equal("red shirt");
        expect(casualty.value).to.equal("my first mission");
        expect(hashTable.search("red shirt")).to.equal(-1);
    });
    it("should return -1 when attempting to delete non-existent elements", ()=>{
        let hashTable = new HashTable(3);
        hashTable.insert("a safe node");
        expect(hashTable.delete("a doomed node")).to.equal(-1);
    });
})