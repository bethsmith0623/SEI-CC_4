<img src="https://i.imgur.com/a0edx5Q.png">

# Control Flow in Python

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe what is truthy & falsey in Python |
| Perform multi-path branching using a `if...elif...else` statement |
| Perform looping using `while` statements |
| Use a **range** and a `for` statement to loop through a range of integers  |

## Set Up

1. Move into this lesson's folder in the class repo.

2. Open the folder in VS Code: `$ code .`

You should see an **exercise.py** file that will be used to enter Python code during the lesson's exercises.  

## Review of Control Flow

As you may recall, **control flow** refers to the order in which code executes in a program as determined by the use of constructs in the code.

In JavaScript, we saw how statements such as `if` and `switch` were used to perform **branching**.

We also used statements such as `for` and `while` to perform **looping**.

The good news is that most programming languages, including Python, share these same control flow constructs.

It's worth pointing out that programming concepts such as variables, data types, control flow, functions, etc. apply to programming languages in general thus making learning additional languages far easier than the first one!

## Conditional Expressions in Python

Control flow typically comes down to different code paths executing according to the evaluation of **conditional expressions**.

In other words, if the **conditional expression** evaluates to _truthiness_, do this stuff, optionally, do something else.

Let's review some of the logic and fundamentals of conditional expressions.

### Boolean Values

Python has two logical boolean values: `True` and `False`.

Most logical operations result in one of these two values. They work exactly the same as in JS but are always written with a starting capital letter in Python.

### Truthy & Falsey in Python

Like JS, every piece of data in Python is considered either **truthy** or **falsey**.

Conditional expressions for `if` statements, etc., rely on an expression evaluating to `True`/**truthy** or `False`/**falsey** to determine which path the code will follow.

Just like in JavaScript, most things in Python are considered to be truthy.

Here's what is **falsey** in Python:

- `False`
- `None`
- Zero in any numeric type: `0`, `0.0` and `0j`
- Empty sequences or collections:
	- `''` (empty string)
	- `[]` (empty list)
	- `()` (empty tuple)
	- `{}` (empty dictionary)
	- `range(0)` (empty range)

> Note the difference between Python's `[]` & `{}` and JavaScript. 

### Comparison Operators

Python has all the same comparison operators as JavaScript:

- `<` - less than
- `>` - greater than
- `<=` - less than or equal
- `>=` - greater than or equal
- `==` - equal to
- `!=` - not equal to

Note that in Python, there's only one equality operator. The `==` in Python is the same as `===` in JavaScript.

#### Examples 

```python
8 > 8
# => False — 8 is not greater than 8.

8 >= 8
# => True — This checks if 8 is greater than or equal to 8, and they are equal.

8 < 8
# => False — 8 is not less than 8.

7 == 7
# => True — 7 is equal to 7.

7 == "7"
# => False — One is a number and the other is a string.

7 != 7
# => False — This checks if they aren't equal. Because does 7 equal 7, it's `False`.

6 != 7
# => True — 6 is not equal to 7.

# Note that in addition to the != operator, you can also use this for inequality
6 <> 7
# => True - 6 is less than or greater than 7.
```

### Logical Operators

Luckily, the amazing logical operators we used in JavaScript work the same way in Python except Python uses English words instead of symbols:

- `or` is the same as `||`
- `and` is the same as `&&`

Again, they work just like they did in JS, which means they always return either the **first** or the **second** operand as follows:

#### `or`

If the first operand is truthy, return it, otherwise return the second operand.

#### `and`

If the first operand is falsey, return it, otherwise return the second operand.

#### Examples

```python
True or False
# => True

False or True
# => True

'hello' or 0
# => 'hello'

0 or 'hello'
# => 'hello'

True and False
# => False

False and True
# => False

'hello' and 0
# => 0

0 and 'hello'
# => 0

'hello' and 'tacos'
# => 'tacos'
```

## Control Flow

### Indentation!

Before we start looking at control flow, it's important to realize that **Python uses indentation to define blocks of code** - not curly braces.

It has always been recommended to use indentation in languages for readability purposes, however, in Python, proper indentation is mandatory!

### Branching with the `if` Statement

Just like in JavaScript, we have the ability to run one of several code paths depending upon the result of conditional expression(s).

Single path `if` statement:

```python
floor = "sticky"
walls = "clean"
if floor == "sticky":   # don't forget the colon
  print("Clean the floor! It's sticky!")
  # more lines of code in this code
  # block need to be indented as well
if walls == "sticky":
  print("Clean the walls! They're sticky!")
```

Yup, no parentheses are required around the conditional expression.

Dual path `if..else` statement:

```python
if condition:
  # do something
else:
  # do something else
  # do something else
```

Multi-path `if..elif..else` statement:

```python
if condition1:
  # do something
  # do something
elif condition2:
  # do something else
  # do something else
  # do something else
elif condition3 and condition4:
  # do another thing entirely
  # do another thing entirely
else:
  # else do this stuff
```

The `elif` is not a typo :)

Also note that `else` is always optional.

> There is no `switch` construct in Python

### 💪 Branching Exercise (5 minutes)

In the **exercise.py** file, you will find the following code that accepts text input from the user:

```python
color = input('Enter "green", "yellow", "red": ').lower()
print(f'The user entered {color}')
```

Below that code, write an `if...elif...else` statement that prints out one of the following messages:

- If `green` is entered, print the message `Go!`
- If `yellow` is entered, print the message `Slow Down!`
- If `red` is entered, print the message `Stop!`
- If anything else is entered, print the message `Bogus!`

To run the code, open a terminal in VS Code by typing `control + backtick`, then type `$ python3 exercise.py`.

## Looping

### The `for` Statement

Python's `for` statement is not designed like the one you first used in JavaScript:

```js
// A JavaScript for loop
for (let i = 0; i < 10; i++) {
  // do stuff
}
```

Instead, the Python `for` loop always iterates over the items in a _sequence_, similar to JavaScript's `for...in` and `for...of` loops.

We'll learn about sequences tomorrow, but here's a taste of how Python's `for` loop is used to loop through a **list** (Python's array):

```python
names = ["Tom", "Deborah", "Murray", "Axel"]

for name in names:
  print(name)
```

The above Python code is like the following ES2015 JS:

```js
var names = ["Tom", "Deborah", "Murray", "Axel"];

for (name of names) {
  console.log(name);
}
```

### The `while` loop

Python also has a `while` loop construct that will continue to iterate **while a given condition is truthy**.

Let's look at the syntax:

```python
while condition:
  # do some stuff
  # do some more stuff
```

`while` loops are great for when you don't know how many times you will need to iterate.

> Beware of infinite loops! When using `while` loops, it's important to ensure that the condition will change to a falsey value so that the loop exits.

### The `break` Statement

Just like in JavaScript, the `break` statement in Python can be used to immediately exit `for` and `while` loops and continue executing any statements that may follow them.

### 💪 Looping Exercise (5 minutes)

Wrap the code in **exercise.py** in a `while` loop such that it continues to prompt for a color until the word `quit` is entered.

## Python Ranges

### Purpose of Ranges

Python _**ranges**_ are a _sequence type_ like _lists_ and _tuples_.

The **range** type represents an immutable sequence of numbers and is commonly used for looping a specific number of times in `for` loops.

_Ranges_ have a class (type) of `range`.

### Ranges - Basic Syntax

Ranges can only be created by invoking the `range()` class:

```python
for num in range(5):
	print(num)
> 0
> 1
> 2
> 3
> 4
```

Notice that by default, the sequence starts at `0` and goes up to, but does not including the integer passed in.

Ranges can also generate sequences with a **start** and a **step**:

```python
for even in range(2, 10, 2):
	print(even)
> 2
> 4
> 6
> 8
```

When not passed in, the _start_ value defaults to `0` and the _step_ defaults to `1`.

Ranges can also be used to create _lists_ and _tuples_:

```python
nums = list(range(10))
print(nums)
> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
odds = tuple(range(1, 10, 2))
print(odds)
> (1, 3, 5, 7, 9)
```

### Ranges - Negative Step

If the _step_ is a negative integer, the _sequence_ counts down:

```python
for num in range(5, 0, -1):
	print(num)
> 5
> 4
> 3
> 2
> 1
```

## Summary

As you have seen today so far, Python is not all that different than JavaScript.

The remainder of the day will provide you with lab time to get some practice performing branching and looping in Python.

But first...

## ❓ Essential Questions

Take a minute to review before the picker shows up...

1. **What are the two types of control flow discussed in this lesson.**

2. **Name three values in Python that are considered to be falsey.**

3. **What is returned by the following expression:**

	```python
	25 or 50
	```
	
4. **What is returned by the following expression:**

	```python
	25 and 50
	```

## References

[Official Docs for Control Flow in Python](https://docs.python.org/3/tutorial/controlflow.html#)
