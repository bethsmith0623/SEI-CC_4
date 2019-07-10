const expect = require("chai").expect;
const { Set } = require("../Set");

describe("Set", () => {
  it("should have a `values` property", () => {
    let set = new Set([1, 2, 3, 4]);
    expect(set.values).to.not.be.undefined;
  });

  it("should create a unique list of values", () => {
    let set = new Set([1, 1, 2, 2, 3, 3]);
    expect(set.values).to.deep.equal([1, 2, 3]);
  });

  it("should have a `length` property", () => {
    let set = new Set([1, 2, 3]);
    expect(set.length).to.not.be.undefined;
    expect(set.length).to.equal(3);
  });

  describe("Set#insert", () => {
    it("should have an `insert` method", () => {
      let set = new Set();
      expect(set.insert).to.not.be.undefined;
    });

    it("should insert a value not already in the Set", () => {
      let set = new Set([1, 2, 3]);
      set.insert(4);
      expect(set.values).to.deep.equal([1, 2, 3, 4]);
    });

    it("should not insert items already in the set", () => {
      let set = new Set([1, 2, 3]);
      set.insert(3);
      expect(set.values).to.deep.equal([1, 2, 3]);
    });
  });

  describe("Set#remove", () => {
    it("should have a `remove` method", () => {
      let set = new Set();
      expect(set.remove).to.not.be.undefined;
    });

    it("should remove an item from the set", () => {
      let set = new Set([1, 2, 3]);
      set.remove(3);
      expect(set.values).to.deep.equal([1, 2]);
    });
  });

  describe("Set#has", () => {
    it("should have a `has` method", () => {
      let set = new Set();
      expect(set.has).to.not.be.undefined;
    });

    it("should return true if a value is in the Set", () => {
      let set = new Set([1, 2, 3]);
      expect(set.has(3)).to.equal(true);
    });

    it("should return false if a value is not in the Set", () => {
      let set = new Set([1, 2, 3]);
      expect(set.has(10)).to.equal(false);
    });
  });

  describe("Set#union", () => {
    it("should have a `union` method", () => {
      let set = new Set();
      expect(set.union).to.not.be.undefined;
    });

    it("should return a new set combination of the previous two sets", () => {
      let set1 = new Set([1, 2, 3]);
      let set2 = new Set([4, 5, 6]);
      let set3 = set1.union(set2);
      expect(set3.values).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    it("should remove duplicate values in union set", () => {
      let set1 = new Set([1, 2, 3]);
      let set2 = new Set([2, 3, 4, 5]);
      let set3 = set1.union(set2);
      expect(set3.values).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe("Set#intersect", () => {
    it("should have a `intersect` method", () => {
      let set = new Set();
      expect(set.intersect).to.not.be.undefined;
    });

    it("should return a set of items in both sets", () => {
      let set1 = new Set([1, 2, 3, 4]);
      let set2 = new Set([2, 3, 4, 5]);
      let set3 = set1.intersect(set2);
      expect(set3.values).to.deep.equal([2, 3, 4]);
    });
  });

  describe("Set#difference", () => {
    it("should have a `difference` method", () => {
      let set = new Set();
      expect(set.difference).to.not.be.undefined;
    });

    it("should return a set items in only 1 set", () => {
      let set1 = new Set([1, 2, 3, 4]);
      let set2 = new Set([3, 4, 5]);
      let set3 = set1.difference(set2);
      expect(set3.values).to.deep.equal([1, 2, 5]);
    });
  });
});
