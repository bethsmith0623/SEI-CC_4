const expect = require('chai').expect;
const { binarySearch, recursiveBinarySearch} = require('../searches');

describe('Binary Search', ()=>{
    it('returns the index of found elements', ()=>{
        const things = [1,3,5,7,9];
        expect(binarySearch(things, 3)).to.equal(1);
        expect(binarySearch(things, 7)).to.equal(3);
        expect(binarySearch(things, 9)).to.equal(4);
    });
    it('returns negative one for unfound elements', ()=>{
        const things = [1,3,5,7,9];
        expect(binarySearch(things, 4)).to.equal(-1);
        expect(binarySearch(things, 99)).to.equal(-1);
        expect(binarySearch(things, 1)).to.equal(0);
    });
});

describe('Recursive Binary Search', ()=>{
    it('returns the index of found elements', ()=>{
        const things = [1,3,5,7,9];
        expect(recursiveBinarySearch(things, 3)).to.equal(1);
        expect(recursiveBinarySearch(things, 7)).to.equal(3);
        expect(recursiveBinarySearch(things, 9)).to.equal(4);
    });
    it('returns negative one for unfound elements', ()=>{
        const things = [1,3,5,7,9];
        expect(recursiveBinarySearch(things, 4)).to.equal(-1);
        expect(recursiveBinarySearch(things, 99)).to.equal(-1);
        expect(recursiveBinarySearch(things, 1)).to.equal(0);
    });
});