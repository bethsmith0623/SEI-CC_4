class trieNode {
    constructor(data, isWord = false){
        this.data = data;
        this.isWord = isWord
        this.children = [];
    }
}

class wordTrie {
    constructor(){
        this.root = new trieNode("");
    }
    addWord(word){
        // this method accepts a complete word in string format
        // it adds a node for each letter if that node doesn't already exist in the Trie
        // each letter should reference the next node in its children array
    }
    isWord(word){
        // this method accepts a string
        // return true if the string is a complete word
        // return false if the string is not a word
    }
    autoComplete(str){
        // this method takes in a string representing what a user has typed so far
        // return an array of possible words that could complete the string given
    }
    bestWord(arrayOfLetters){
        // this method accepts an array of single character letters
        // using the array, find the largest word in the Trie that uses the combination of letters in the given array
        // use only the letters in the array, i.e. if the array contains two 's' letters, the best word can only have two 's' letters total
    }
}

// npm package for words found here: https://www.npmjs.com/package/word-list
const fs = require('fs');
const wordListPath = require('word-list');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

const theDictionary = new wordTrie();
// loop over wordArray and add each letter to theDictionary

module.exports = theDictionary;