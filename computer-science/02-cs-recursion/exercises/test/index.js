const expect = require('chai').expect;
const { findMax, factorial, fibonacci, coinFlips, letterCombinations} = require('../../solutions-and-instructor-guides/recursionSolutions');

describe('findMax', ()=>{
    it('should find the largest number in an array', ()=>{
        let testArray = [3,4,2,1,2];
        expect(findMax(testArray)).to.equal(4);
    });
    it('should work for negative numbers', ()=>{
        let testNegatives = [-1, -4, -2];
        expect(findMax(testNegatives)).to.equal(-1);
    });
})

describe('factorial', ()=>{
    it('should accurately calculate factorials', ()=>{
        expect(factorial(3)).to.equal(6);
        expect(factorial(5)).to.equal(120);
    });
})

describe('fibonacci', ()=>{
    it('should accurately return base cases', ()=>{
        expect(fibonacci(1)).to.equal(1);
        expect(fibonacci(2)).to.equal(1);
    });
    it('should accurately calculate subsequent numbers', ()=>{
        expect(fibonacci(3)).to.equal(2);
        expect(fibonacci(4)).to.equal(3);
        for(let i = 3; i < 10; i++){
            expect(fibonacci(i)).to.equal(fibonacci(i-1)+fibonacci(i-2));
        }
    });
})

describe('coinFlips', ()=>{
    it('should return an array', ()=>{
        expect(Array.isArray(coinFlips(2))).to.equal(true);
    });
    it("should include all possibilities", ()=>{
        let results = coinFlips(4);
        expect(results.includes("HHHH")).to.equal(true);
        expect(results.includes("HTHT")).to.equal(true);
        expect(results.includes("TTTT")).to.equal(true);
        expect(results.length).to.equal(16);
    });
})

describe('letterCombinations', ()=>{
    it("should return an array", ()=>{
        expect(Array.isArray(letterCombinations(["a","b","c"]))).to.equal(true);
    });
    it("should include single letter results", ()=>{
        expect(letterCombinations(["a","b","c"]).includes("b")).to.equal(true);
    });
    it("should include combinations in different order", ()=>{
        expect(letterCombinations(["a","b","c"]).includes("ba")).to.equal(true);
        expect(letterCombinations(["a","b","c"]).includes("ab")).to.equal(true);
    });
    it("should include full-length combinations", ()=>{
        expect(letterCombinations(["a","b","c"]).includes("bac")).to.equal(true);
        expect(letterCombinations(["a","b","c"]).includes("cab")).to.equal(true);
    });
})