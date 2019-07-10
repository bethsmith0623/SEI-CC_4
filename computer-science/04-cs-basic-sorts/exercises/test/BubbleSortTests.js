const expect = require('chai').expect;
const bubbleSort = require('../BubbleSort');

describe('Bubble Sort', ()=>{
  it('should sort the array', ()=>{
    const myArray = [12,6,3,7,13,8];
    const sorted = bubbleSort(myArray);
    expect(sorted).to.deep.equal([3,6,7,8,12,13]);
    const otherArray = [-3, -1, 5, 100];
    const otherSorted = bubbleSort(otherArray);
    expect(otherSorted).to.deep.equal([-3, -1, 5, 100]);
  })
})