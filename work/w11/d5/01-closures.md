<img src="https://i.imgur.com/qI5itXg.jpg">

# Walk-thru of JavaScript Closures

## Roadmap

- Intro
- Review of Scope
- Inner Functions
- BAM! We have Closure
- Definition of a Closure
- Examples of Closures
- Closing

## Intro

Closures are one of my three **JavaScript Ninja** topics:

1. `prototypal inheritance` and the 	`prototype chain`: **How JS implements object inheritance and property lookup**
2. `this`: **A keyword in JS that represents a function's "context" during its execution** <br>and finally,
3. `closures`: **A feature in the JS programming language that enables a function's free variables to exist even after its enclosing function has completed execution**  

This discussion on closures is an important one because they are a key feature of languages with first-class functions such as JavaScript and Python.

More importantly, you will likely be asked about them in technical interviews.

To start, realize that closures are **not** explicitly created; code like this<br>`var c = new Closure();`<br>does not exist.

Basically, closures come into and out of existence when JavaScript programs execute.

Let's see how...

## Review of Scope

Understanding scope is fundamental to the concept of closures.

**?: What is scope?**

**?: How is a new scope created in JavaScript?**

**?: What happens when a function's code accesses a variable or function that is not in its local scope?**

**?: When is a scope destroyed and marked for garbage collection?**<br>*unless...*

## "Remembering" Scope Using Inner Functions

Let's first look at a very basic function:

```js
function f() {
  var x = 5;
  console.log(x);
}
```

**?: When we invoke this function, what will the lifetime of the variable `x` be?**

Now let's refactor this code by including an inner (nested) function inside of function `f()`:

```js
function f() {
  var x = 5;
  
  function inner() {
    console.log(x);
  }
  
  inner();
}
```

**?: Have we changed the functionality of `f()` by adding the nested function?**

**?: What scope is the variable `x` in?**

Now let's look at a way that we can invoke the function `inner()` from outside of function `f()`:

```js
function f() {
  var x = 5;
  
  function inner() {
    console.log(x);
  }
  
  return inner;
}

var fun = f();  // fun now references the "inner()" function
fun();
```

**?: Since a function's scope is destroyed after a function has finished executing, should the scope of `f()` exist when we invoke `fun()`?**

## What's a "free" Variable?

The variables accessible by a function that are not defined locally are called _free variables_.  They are called free variables because the function gets them for free :)

**?: What are the free variables of the `inner()` function above?**

## BAM! We have Closure

Why does the `console.log(x)` work as expected if the scope that variable `x` lives in has been destroyed?

Because a **closure** has been created by the fact that the nested function, `inner()`, references a free variable `x`, and `inner()` is still in existence thanks to the external reference to it by the variable `fun`.

**?: If the variable `fun` went out of scope, or was reassigned so that it did not reference function `inner()` anymore, what do you think would happen to the closure?**

## Definition of a Closure

So, when you are asked, "What the heck is a closure?"

The description in the intro above is highly accurate, however, here's a viable answer that's not too technical:

> A closure is a way for JavaScript to "remember" scope.

A follow-up question might be, "How or when is a closure created?"

> Slightly more technical answer: When there's a reference to a function that's accessing its free variables.

In summary, closures are created normally when we write JavaScript - they are not explicitly created.

**They come into existence when a function continues to reference its free variable(s) after its enclosing function has finished execution.**

Closures have their use cases and are being created and destroyed as JavaScript executes.  

## Examples of Closures

Closures typically are more important to the creators of libraries and frameworks, however, let's take a look at a few examples of how we might create them.

### Example 1 (factory pattern #1)

```js
function adderFactory(fixedOperand) {
  
  return function(secondOperand) {
    return fixedOperand + secondOperand;
  };

}

var add5 = adderFactory(5);
add5(2) // returns 7

var addTwenty = adderFactory(20);
addTwenty(100) // returns 120
```

Note here that `adderFactory()` returns an anonymous function expression, there's no need that the inner function be a function definition.

### Example 2 (factory pattern #2)

```js
function elapsedTimeFactory() {
  var startTime = Date.now();

  return function() {
    return Date.now() - startTime;
  };
}
```

**?: How many of these timers could we create?**

**?: What is the inner function's free variable(s)?**

### Example 3 (module pattern)

As you know, an object holds information in properties. There are no variables allowed within an object.

Also, as you know, there is no easy way to "hide", or as developers say, make "private", an object's properties.

Now let's see how closures can be used to implement "private" variables in an object or "module":

```js
var fourLetterWord = (function() {
  var _fourLetterWord = 'love';
  
  return {
    // property getter
    get word() {
      return _fourLetterWord;
    },
    // property setter
    set word(newWord) {
      if (newWord.length === 4) _fourLetterWord = newWord;
    },
    version: 1.0
  };
})();

fourLetterWord.version
// 1
fourLetterWord.word
// love
fourLetterWord.word = 'six';
fourLetterWord.word
// love
fourLetterWord.word = 'four';
fourLetterWord.word
// four
```

Note that the above code is returning an object that has ES5's under utilized [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) properties.

Note that there's no way to access the private variable `_fourLetterWord `.

## Summary

Closures are not complicated, however, they are a mystery to many programmers and even those familiar with them have a hard time explaining them (myself included).

Be sure to refresh your memory of their definition and use before each tech interview.