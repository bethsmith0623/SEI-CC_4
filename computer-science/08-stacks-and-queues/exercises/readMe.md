![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

# Stacks and Queues Challenge: Bracket Matching

Surely by now you've made an error in your code that seemed impossible to track down. But in the end, the root of all that trouble might have been something as simple as a missing (or extra) curly brace `}`. This example might be all too relatable (or painful)!

One really convenient application for LIFO (Last In First Out) structures is matching brackets. That's because every time you encounter a closing bracket, it needs to match the **most recently used** open bracket. 

For example, this is valid: Nesting is OK!

```
[]{}(({}))
```

But this one doesn't work:

```
{(})
```

This is because the closing `}` you encounter doesn't close an opening `{` but instead is trying to close `(`, which doesn't match!


## Directions

Create a method in JavaScript called `bracketMatcher()` that takes a string as an input. The function should determine if all brackets are correctly matching and properly nested. The return value of the function is `true` if the bracket combination is valid and `false` if it is not. This is a tool that could be used to detect syntax errors in your code!

It should check for the following: `[ ]`, `{ }`, and `( )`. Anything else (numbers, letters, punctuation, whitespace, etc.) should be skipped/ignored. This is a valid bracket sequence:

```
abc(123)!{def}456:D
```

Once you ignore or remove all of the other characters, it just becomes:

```
(){}
```

#### Starter Code

If you feel ready, go ahead and [get started!](/data-structures/stacks-queues/exercises/starter-code/01-brackets.js)

#### Hints

Need some help getting started? Click on the hints below for inspiration.

<details>
    <summary>HINT 1</summary>
    <br>
    We need to go through the input string one character at a time. You can do this in JavaScript by calling <b>split('')</b> to split a string into an array of characters; then you can loop through the characters with a `for` loop. Here's what that looks like:

    let characters = input.split('')

    for(let i = 0; i < characters.length; i++) {
        // YOUR CODE HERE
        // Inside this loop characters[i] is the particular character inside
        // the string you're iterating over.
    }
</details>

<details>
    <summary>HINT 2</summary>
    <br>
    This problem is all about <b>matching</b>. Once we find a closing bracket that matches an opening bracket, we don't need to keep track of it anymore. Thus, the only thing we really need to keep in our data structure is the opening brackets! We can also just skip anything that isn't a bracket entirely.<br> Which data structure seems most suited to hold your opening brackets?
</details>

<details>
    <summary>HINT 3</summary>
    <br>
In this instance, a stack is going to be more useful than a queue because we always want to <b>close</b> the <b>most recently</b> opened bracket. For example, if we encounter (, {, }, and ) in that order, we know it's valid. Our actions would look like this in pseudocode:

    1. See (. Because it's an opening bracket, push it onto the stack.
    2. See {. Because it's an opening bracket, push it onto the stack.
    3. See }. Because it's a closing bracket, pop from the stack and check for a match.
    4. It matches! { is the opening bracket for }, so let's keep going!
    5. See ). Because it's a closing bracket, pop from the stack and check for a match.
    6. It matches! ( is the opening bracket for ), so let's keep going!
    7. No more items in the stack.
    8. Return true (no errors found, so it's valid!)

Likewise, we know that if the brackets do not match, then we must return `false`. For example, {, (, }, and ) is not valid. We'd walk through that example like so:

    1. See {. Because it's an opening bracket, push it onto the stack.
    2. See (. Because it's an opening bracket, push it onto the stack.
    3. See }. Because it's a closing bracket, pop from the stack and check for a match.
    4. It doesn't match! Return false!
</details>

<details>
    <summary>HINT 4</summary>
    <br>
How do you know if a bracket is an opening bracket? How do you know if it's a closing bracket? You could determine this any number of ways, but for your convenience, you can use these two helper functions:

    const isOpening = (character) => '{(['.indexOf(character) !== -1
    const isClosing = (character) => '})]'.indexOf(character) !== -1
</details>

<details>
    <summary>HINT 5</summary>
    <br>
You may notice that you get to a point where you're passing almost all of the tests except for one, such as this:

    bracketMatcher('abc(123');

It should return `false`, because an opening bracket with no closing bracket is invalid. You can make sure this case gets caught by checking to make sure the stack is empty at the end of the function.
</details>

<details>
    <summary>HINT 6</summary>
    <br>
We need a way to make sure that the opening and closing brackets of each type ((), {}, []) are matched to each other. We can do a bunch of `if/else` statements to figure this out, and that would totally work... however, because we enjoy writing less code, we might consider using a JavaScript object to match the opening and closing brackets of each type. 

You have a couple ways of going about this. First, you could keep the values in a string and track that the position is the same. For example, you could have:

    let openings = '{(['
    let closings = '})]'

Then, when you accessed them with the built-in `indexOf()` function, you could track that the position of the opening and the position of the closing matched. For example, [ and ] are both found at Index 2 in their respective strings. 

**Alternatively**, we can use JavaScript objects. This has the benefit of increased readability:

    const brackets = {
        '{': '}',
        '(': ')',
        '[': ']'
    }

Now, instead of a gnarly `if` statement, you can simply use object notation like this:

    if(brackets[characters[i]] !== stack.peek()) { /* stuff */ }
</details>
