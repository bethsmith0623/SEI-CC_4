const expect = require('chai').expect;
const { theDictionary } = require('../Trie');

describe('theDictionary', ()=>{
    it('should confirm words that exist', ()=>{
        let isWord = theDictionary.isWord("dog");
        expect(isWord).to.be.true;
    });
    it('should return false on isWord for nonsense words', ()=>{
        let isWord = theDictionary.isWord("oneofusgooblegobblegooblegobble");
        expect(isWord).to.be.false;
    });
    it('should give reasonable autoComplete suggestions', ()=>{
        let suggestions = theDictionary.autoComplete("pizz");
        expect(suggestions.includes("pizza")).to.be.true;
        let moreSuggestions = theDictionary.autoComplete("pre");
        expect(moreSuggestions.includes("prevent")).to.be.true;
        expect(moreSuggestions.includes("preamble")).to.be.true;
        expect(moreSuggestions.includes("preparations")).to.be.true;
    });
})