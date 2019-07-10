const expect = require('chai').expect;
const bucketSort = require('../BucketSort');

describe('Bucket Sort', ()=>{
  it('should sort the array', ()=>{
    const myArray = [12,6,3,7,13,8];
    const sorted = bucketSort(myArray);
    expect(sorted).to.deep.equal([3,6,7,8,12,13]);
    const otherArray = [-3, -1, 5, 100];
    const otherSorted = bucketSort(otherArray);
    expect(otherSorted).to.deep.equal([-3, -1, 5, 100]);
  })
})
