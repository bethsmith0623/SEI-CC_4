<img src="https://i.imgur.com/a0edx5Q.png">

# Intro to Python

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use the Python REPL |
| Execute Python scripts |
| Define and use variables |
| Create comments |
| Describe Python data types |
| Use and format Strings |

## Intro to Python

### History

The Python programming language started in December 1989 as a hobby project for Dutch programmer Guido van Rossum. He was looking for a programming project to keep himself occupied during his Christmas break.

Python was first released to the public in 1991.

### Versions

Ten years after its release, Python 2.0 was introduced with many major new features and it started to gather a community dedicated to its development.

Python 3.0 was released in December 2008.

Version 3.0 introduced many enhancements, however, it included changes that made Python 3 incompatible with much of the existing 2.0 code.

### Type of Language

Python, like JavaScript, is a high-level interpreted programming language.

High-level means that Python is designed for writing applications vs. lower-level software such as operating systems and device drivers. It also means that programmers don't have to worry about things like memory management.

Also like JavaScript, Python is a dynamic scripting language that does not have to be compiled before it can be executed - it runs within an _interpreter_ that handles the conversion into machine code.

Python comes with a large standard library and is suitable for many types of programming tasks from web development to machine learning.

However, if Python does not include functionality that you need, there is a huge repository, the [Python Package Index](https://pypi.org/), with over 169,000 third-party packages available for use.

### Syntax & Semantics

Python was designed to be an easy to read programming language.

Its formatting is visually uncluttered and it often uses English keywords where other languages use punctuation or symbols. For example, the equivalent to JS's `&&` operator in Python is `and`. 

Unlike many other languages, it does not use curly braces to define blocks of code, instead, it uses indentation.

## Python Interpreter & REPL

We'll be using **Python 3** at all times during SEI.

### Ensure `Python 3` is Installed

In terminal type: `python3`

If you receive an error, run `brew install python3`, quit and re-open terminal, and try `python3` again.

Similar to what you saw with **Node.js**, Python comes with an interactive REPL (Read-Evaluate-Print-Loop) that provides a way to run Python code by typing in.

For now, type `exit()` or press `control + d` to exit the REPL.

### Running Python Scripts

In terminal, we can execute any python script like this:

```
$ python3 <filename>.py
```

Let's test this out by running the included **fizzbuzz.py** script.  Make sure that you're in this lesson's folder within the class repo and type:

```
python3 fizzbuzz.py
```

You'll see that the print statements within the script output to the terminal.

Unlike we saw with Node.js, providing the file extension (`.py`) is required.

### REPL

During the remainder of this lesson, we'll be experimenting in the Python interpreter/REPL.

In terminal: `$ python3`

At the `>>>` prompt, type `help()`, then type `quit` to return to the REPL.

Cool, let's explore Python a bit in its REPL...

## The Python Language

### Comments

We use the `#` character to make a comment in Python:

```python
# This is a comment! Python will ignore it.
```

Anything after the `#` will not be run:

```python
total_guitars = 7  # Hope someone knows how to play guitar
```

To make multiline comments, we use triple quotes, `"""`, or the `#` on each line:

```python
"""
This is a
multiline comment
"""

# This is a
# multiline comment
```

Multiline comments are often used to document what a function or module does, therefore, they are sometimes referred to as _docstrings_.

### Python Variables

Variables in Python work in much the same way that variables work in JavaScript.

Variables hold the data an app needs when it runs.

#### Declaring

Here is how we declare a variable in Python:

```python
my_number = 15
```

Notice that there is no `var`, `let`, or `const` keyword in Python. We only need the name of the variable and then we can assign to it.

However, you cannot just declare a variable without assigning to it - there is no `undefined` in Python:

```python
# illegal syntax...
my_variable
NameError: name 'my_variable' is not defined
```

#### Naming Convention

Variables are case sensitive - variables named `my_number` and `My_Number` would be two different variables.

When you have a variable name with multiple words, the convention is to **snake_case** the identifier:

```js
// In JavaScript we use camelCase...
var myNumber = 10;
```

```python
# In Python we use snake_case...
my_number = 10
```

#### Reassigning Variables

Just like in JavaScript, we can freely assign a new value to a variable after it is declared.

```python
my_number = 15
print(my_number)
my_number = -4
print(my_number)
```

Of course, reassignment replaces the current value and that previous value would no longer be available - just like in JS.

> The `print()` function works very much like `console.log()` does in JavaScript.

### Data Types

Python is very object-oriented.

Every piece of data in Python is an object that's an instance of a _class_.

#### Checking the Data Type (class) of an Object

We use the `type()` function to obtain the class used to instantiate the data:

```python
>>> type(42)
<class 'int'>
>>> type('hello')
<class 'str>
>>> type(True)
<class 'bool'>
```

Python's data types are similar to those available in JavaScript, there's just more of them...

#### Integer Numbers (`<class 'int'>`)

Unlike in JavaScript, Python distinguishes between integers (whole numbers) and floats (numbers with decimals).

When we don't follow a number literal with a decimal point, an integer is assumed:

```python
>>> some_int = 25
>>> type(some_int)
<class 'int'>
```

We can force numbers to act as integers in some mathematical operations, as we will see. Doing this can force an integer result which is usually the same as calling `Math.floor()` in JavaScript.

#### Floating-point Numbers (`<class 'float'>`)

Numbers with a decimal point are stored in variables as floating-point numbers, usually just called a `float`.

```python
>>> pi = 3.14159
>>> type(pi)
<class 'float'>
>>> some_float = 25.
>>> type(some_float)
<class 'float'>
```

#### Complex Numbers (`<class 'complex'>`)

Python even has a data type for complex numbers, i.e., numbers with an "imaginary" component usually obtained by taking the square root of a negative number.

The imaginary portion is represented by the letter 'j':

```python
>>> my_complex = 3+4j
>>> type(my_complex)
<class 'complex'>
```

#### Booleans (`<class 'bool'>`)

Named after George Boole, these are the logical data types often used in conditional expressions.

Just like in JS, we have `true` and `false` but spelled slightly differently:

```python
>>> my_bool = True
>>> my_other_bool = False
>>> type(my_bool)
<class 'bool'>
```

Notice how they start with capital letters! You must start them with capital letters in Python or they will not reflect the boolean values. 

#### Nothingness (`<class 'NoneType'>`)

Similar to how JS has the `null` value to represent nothingness, Python has a similar value:

```python
my_nothing = None
```

The value `None` in Python, with a capital N, provides the same meaning as `null` does in JavaScript.

### Math operations

Python has the normal math operators that you are used to from JavaScript:

- Addition `(+)`
- Subtraction `(-)`
- Multiplcation `(*)`
- Division `(/)`
- Modulo (remainder) `(%)`
- Exponentiation `(**)`

All work as you would expect. However, there few other things worth mentioning...

#### Integer Division

It was mentioned earlier that you could force operands to act like integers to get an integer result. This is specifically enabled for division:

```python
>>> quotient = 5 // 2
>>> quotient
2
# 2 is printed, because the decimal ".5" is truncated
```

#### Shortcut Assignment Operators

As we saw in JS, the operation of reassigning to a variable the result of adding, etc. to that variable is so common, there are a number of shortcut operators in the language that make it cleaner to write. 

Python has the very same operators, 

```python
# This line of code...
num = num + 1
# ...can be written with this shortcut operator:
num += 1

# It also works for any of the other math operations:
num = num / 5
# Rewrite like this:
num /= 5

# And this...
num = num * 3
# Can be written as this...
num *= 3
# And so on with the other operators.
```

> IMPORTANT: A couple of our favorites in JS, the Increment (`++`) and Decrement (`--`) operators, do not exist in Python. Use `+= 1` and `-= 1` instead.

### Ternary Expressions

In JS we used the ternary expression to concisely return one of two values depending upon a conditional expression, for example:

```js
// Using the ternary operator/expression
let beverage = age >= 21 ? 'Beer' : 'Milk';

// Without a ternary expression
let beverage;
if (age >= 21) {
  beverage = 'Beer';
} else {
  beverage = 'Milk';
}
```

Python, however, does not have a dedicated ternary operator. Instead, Python uses a modified syntax of `if`/`else` which results in a ternary expression instead of a control flow construct.

The Python ternary expression equivalent to the JS example above is:

```python
beverage = 'Beer' if age >= 21 else 'Milk'
```

### Converting Between Data Types

One thing we kind of took for granted in JavaScript was that it usually performed automatic data type conversion for us - a process known as implicit type coercion.

```js
// JavaScript
let numTacos = 25;
let msg = 'There are ' + numTacos + ' tacos';
msg => There are 25 tacos
```

However, in Python we cannot do this - there is no type coercion. With few exceptions, variables must be the same type to perform an operation on them.

Luckily, doing math operations between integers and floats is allowed, but not much else.

When the time comes to convert one data type into another, Python provides us with several global functions to do so:

```python
str(item)        # Converts item to a string
int(item, base)  # Converts the provided item to an integer with the provided base
float(item)      # Converts the item to a floating-point number
hex(int)         # Converts an integer to a hexadecimal STRING
oct(int)         # Converts an integer to an octal STRING
tuple(item)      # Converts item to a tuple
list(item)       # Converts item to a list
dict(item)       # Converts item to a dictionary
```

### Working with Strings

Python also has strings for holding text, just like JavaScript:

```python
my_string = "A double quoted string"
your_string = 'A single quoted string'
```

You can also do some multi-line strings by using a triple quote (single or double):

```python
multiline_string = '''This is my string that
                        goes on multiple lines
                          for whatever reason'''
```

#### Concatenating Strings

One or more strings can be combined into a single string in the same way we do it in JS, by using the `+` operator:

```python
little_string = "bad"
medium_string = "super"
long_string = medium_string + little_string
print(long_string)
# prints "superbad"
```

#### String Interpolation using f-Strings

One fancy thing that Python has had much longer than JavaScript is a nice syntax for string interpolation (evaluating Python expressions and embedding the result within strings).

While we can always use the concatenation operators above, these get ugly when too many of them appear in a string. Instead, we can use syntax similar to what was introduced in ES6 with string template literals. You just need to remember to add an `f` before the string:

```python
state = "Hawaii"
year = 1959
message = f"{state} was the last state to join the U.S. in {year}."
```

When the `f` is placed directly before the opening quote (single, or double) of the string, it makes a formatted string or, **f-String**, for short.

Once we do this, we can put expressions into curly braces to "inject" the result of the expressions into the string.

f-Strings are awesome, but they've only been available since version 3.6.

Prior to f-Strings, there were a couple of other options, one being the string `format` method:

```python
template = "My name is {} and I like {}"
print( template.format("Jim", "tacos") )
# prints 'My name is Jim and I like tacos'
```

#### Useful String Methods

Just like JS, Python has a number of string methods that we can use for string manipulation.

Some are familiar, like `split()` but others have different names:

```python
"ace of spades".split(" ")
# => ['ace', 'of', 'spades']

# However, this won't work
"abcd".split("")
# Instead, use the list() function like this:
list("abcd")
# => ['a', 'b', 'c', 'd']

"qqxzzz".index("x")    # Warning: Raises error if substring not found
# => 2

"boo".upper()
# => "BOO"

"WHY???".lower()
# => "why???"

"Then I went to the store I like".replace("I", "you")
# => 'Then you went to the store you like'
```

Want to know if a string contains a substring? You don't even need a function for that. You can use the most excellent `in` operator to quickly find out if one string appears in another.

```python
"eggs" in "green eggs and ham"
# => True
```

Use the built-in global `len()` function on a string to find its length.

```python
len("Tacos")
# => 5
```

### Python's Built-in Functions

Notice above that we did not call `len()` as a method on the string - we didn't do this: `"Tacos".len()`.

`len()` is just one of several [built-in functions](https://docs.python.org/3/library/functions.html) that exists in Python.

`len()`, for example, is a function that returns the length (the number of items) of an object. The argument may be any sequence or collection (more on these tomorrow).

Why does `len()` work on strings?  Because in Python, a string is a sequence of characters.

Because a string is a `sequence`, as we can in JS, we can use square brackets to access the characters in the string (but not assign to them, also like JS):

```python
course = 'SEI'
print( course[0] )
# => Prints 'S'

# We can use negative indexes!
last_letter = course[-1]
print( last_letter )
# => Prints 'I'
```

Later we'll see other fancy uses of square brackets.

Let's wrap up with a few questions...

## ❓ Essential Questions

1. **True or False: Every piece of data in Python is an object.**

2. **Will the following code run without error in Python?**

	```python
	num = 25
	msg = "There are " + num + " tacos"
	```

3. **String interpolation can be performed in Python by using __-Strings or the ________ method.**

## Further Study

[Real Python Tutorials](https://realpython.com/)

## References

[Official Python Site](https://www.python.org/)
