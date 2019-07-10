# Word Trie Challenge

Your challenge in this exercise is to implement a trie that can store and retrieve all words in the English language. 

First, run `npm install` to install the necessary `word-list` dependency, along with the testing libraries `mocha` and `chai`.

In the `Trie.js` file, you will find that the word list has been imported and formatted into an array called `allWords`. Your first task is to loop over this array and use it to create and store nodes in the Trie for each letter. The Trie should start with an empty root node. This root node will end up with 26 children nodes, one for each letter of the alphabet. Each node should store a single letter, a collection of its children nodes, and a Boolean for whether or not the letter sequence so far is a complete word. In this implementation, we will store the children nodes in an array, to keep things simple.
