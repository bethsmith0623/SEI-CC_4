[click to view as a presentation](https://presentations.generalassemb.ly/8dc06dcff1d57fc8a6f0b8cee65560c0#/1)

---
<img src="https://i.imgur.com/DPzk4Ok.png">

# Python Containers

---
## Learning Objectives
<br>

<p>Students will be able to:</p>

- Use _lists_, _tuples_ & _dictionaries_ as containers for data

- Use _list comprehensions_ to create lists

- Create subsets of a _sequence_ using the _slice_ operator

---
## Setup
<br>

- To test some of the examples and complete the exercises, please open a Python _repl.it_

---
### General Purpose Containers
<br>

- As you know by now, applications frequently need to maintain collections of data within a _container_ data type.

- **What did we use in JS to hold collections of data?**

- In this lesson, we're going to review the following Python built-in types commonly used as _containers_:
	- **dictionaries**
	- **lists**
	- **tuples**

---
## Dictionaries

---
### Dictionaries - Purpose
<br>

- **Dictionaries** are to Python as **objects** are to JS.

- A **dictionary** provides a container for `key: value` pairs. We can refer to `key: value` pairs as **items**.

- _Dictionaries_ have a class (type) of `dict`.

---
### Dictionaries - Basic Syntax
<br>

- Like _objects_ in JS, a **dictionary** is created with a set of _curly braces_:

	```python
	student = {
		'name': 'Fred',
		'course': 'SEI',
		'current_week': 7
	} 
	```
- Unlike in JS, _strings_ used as keys must be quoted.

- If not quoted, Python expects the identifier to be a variable holding what you want to use as the key. This is similar to how _computed properties_ work in JS.

---
### Dictionaries - Features
<br>

<p><em>Dictionaries</em> have the following features:

- They are unordered (just like JS objects)

- They are mutable:
 	- The values assigned to a key can be changed
 	- Additional items can be added
 	- Existing items can be deleted
 
- Any immutable type can be used as a key, including _numbers_ and _tuples_ (which we'll cover in a bit).

---
### Dictionaries - Getting/Setting Values
<br>

- We use _square brackets_ to get and set an item's value:

	```python
	name = student['name']
	print(name)
	> Fred
	student['name'] = 'Tina'
	print(name)
	> Tina
	```

- Unlike JS, you cannot access items in a Python dictionary using **dot notation** (dots are used to invoke methods).

---
### Dictionaries - <span style="text-transform: lowercase">get</span> Method
<br>

- Unlike JS which returns `undefined` when accessing a property that does not exist, a _dictionary_ will raise a `KeyError`.

- One option to avoid this error is to use the `get` method:

	```python
	birthdate = student['birthdate']
	> KeyError: 'birthdate'
	print( student.get('birthdate') )
	> None
	# Provide a default value if key not in dictionary
	print( student.get('birthdate', '07-04-1776') )
	> 07-04-1776
	```

---
### Dictionaries - <span style="text-transform: lowercase">in</span> Operator
<br>

- Another way to avoid the `KeyError` is to use the `in` operator to check if the _dictionary_ includes a key:

	```python	
	if 'course' in student:
	    print( f"{student['name']} is enrolled in {student['course']}")
	else:
	    print( f"{student['name']} is not enrolled in a course")
	```

---
### Dictionaries - Adding Items
<br>

- Simply assigning to a _key_ that does not exist will create a new item in the dictionary:

	```python
	student['age'] = 21
	```

---
### Dictionaries - Deleting Items
<br>

- The `del` statement is used to delete an item from a _dictionary_:

	```python
	del student['age']
	# Verify that item was deleted
	'age' in student
	> False
	```

---
### Dictionaries - Number of Items
<br>

- Use the built-in `len` function to retrieve the number of items in a _dictionary_:

	```python
	print( student )
	> {'name': 'Tina', 'course': 'SEI'}
	len(student)
	> 2
	len({})
	> 0
	```

---
### Dictionaries - Iterating Items
<br>

- `for` loops are used to iterate over the items in a dictionary. However, the following is considered to be a Python [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern):

	```python
	for key in student:
	    print( f"{key} = {student[key]}" )
	```
	
- The preferred way is to use the `items()` method to obtain a [dictionary view object](https://docs.python.org/3/library/stdtypes.html#dictionary-view-objects)...

---
### Dictionaries - Iterating Items

- The best practice way to iterate over the items in a _dictionary_ is to use a `for` loop to iterate over a _dictionary view object_ as follows:

	```python
	for key, val in student.items():
	    print( f"{key} = {val}" )
	```

- The `student.items()` call above returns a wrapped set of _tuples_:

	```python
	student.items():
	> dict_items([('name', 'Tina'), ('course', 'SEI')])
	```

- The `for` statement "unpacks" the tuples by assigning its values to multiple variables like with `key, val` above.

---
## Dictionary - Practice Exercise<br><small>(10 minutes)</small>
<br>

- Define a Python _dictionary_ named **`where_my_things_are`** containing a few items; where  the `keys` are things you have, and the `value` is the location you keep those things.

- Write a `for` loop that iterates over the items in the dictionary and prints each one as _My [thing] is kept [location]_.

---
## Lists

---
### Lists - Purpose
<br>

- **Lists** are to Python as **arrays** are to JS.

- A **list** provides a container for zero or more items (_elements_).

- **Lists** can contain items of different types, including _dictionaries_ and nested _lists_.

- **Lists** have a class (type) of `list`.

---
### Lists - Basic Syntax
<br>

- Like _arrays_ in JS, a **list** is created with a set of _square brackets_:

	```python
	colors = ['red', 'green', 'blue'] 
	```

- The number of items in a _list_ is returned using the built-in `len()` function:

	```python
	len(colors)
	> 3
	```
---
### Lists - Features
<br>

<p><em>Lists</em> have the following features:

- They are considered to be a _sequence_ type in Python. A _sequence_ is a generic term used for an **ordered** collection. Other _sequence_ types in Python include _strings_ and _tuples_.

- Lists are mutable:

 	- Items within the _list_ can be replaced
 	- Items can be added and removed from a _list_

---
### Lists - Accessing Items
<br>

- Accessing the individual items of a _list_ is much like accessing elements in a JS array, i.e., by using _square brackets_ with an expression that evaluates to an integer:

	```python
	idx = 1
	colors[idx + 1]
	> blue
	```

---
### Lists - Accessing Items
<br>

- However, unlike in JS, we can use negative integers to index from the end of a _list_:

	```python
	colors[-1]
	> blue
	```
	No need to write code like `colors[len(colors) - 1]` - yay!


---
### Lists - Assigning Items
<br>

- We also use square brackets to target an item of a _list_ for assignment:

	```python
	colors[-1] = 'brown'
	print(colors)
	> ['red', 'green', 'brown']
	```

---
### Lists - Adding Items
<br>

- The equivalent to JS's `push()` method is `append()`:

	```python
	colors.append('purple')
	```
	
	However, unlike JS's `push()` method, `append()` can only add one item and does not return a value.
	
- For adding multiple items, use the `extend()`:

	```python
	colors.extend(['orange', 'black'])
	```

---
### Lists - Inserting Item
<br>

- To add items to anywhere but the end of a _list_, use the `insert()` method:

	```python
	print(colors)
	> ['red', 'green', 'brown', 'purple', 'orange', 'black']
	colors.insert(1, 'yellow')
	> ['red', 'yellow', 'green', 'brown', 'purple', 'orange', 'black']
	```

---
### Lists - Deleting Items
<br>

- Yup, there's a `pop()` method, but it's more flexible in Python because you can specify the index of the item to remove and return:

	```python
	print(colors)
	> ['red', 'yellow', 'green', 'brown', 'purple', 'orange', 'black']
	green = colors.pop(2)
	print(colors)
	> ['red', 'yellow', 'brown', 'purple', 'orange', 'black']
	```

---
### Lists - Deleting Items
<br>

- If you don't care about the value returned by `pop()`, you can also use the `del` operator to delete items:

	```python
	print(colors)
	> ['red', 'yellow', 'brown', 'purple', 'orange', 'black']
	del colors[1]
	print(colors)
	> ['red', 'brown', 'purple', 'orange', 'black']
	```

---
### Lists - Deleting Items
<br>

- Also there's a `remove()` method that removes the first item that matches what you pass in:

	```python
	print(colors)
	> ['red', 'brown', 'purple', 'orange', 'black']
	colors.remove('orange')
	print(colors)
	> ['red', 'brown', 'purple', 'black']
	```
	No value is returned by the `remove()` method.

---
### Lists - Clearing
<br>

- Lastly, `clear()` does just what it's name implies:

	```python
	print(colors)
	> ['red', 'brown', 'purple', 'black']
	colors.clear()
	print(colors)
	> []
	```

---
### Lists - Iteration
<br>

- The `for` loop is used to iterate over the items in a _list_:

	```python
	colors = ['red', 'green', 'blue']
	for color in colors:
		print(color)
	> red
	> green
	> blue
	```

---
### Lists - Iteration
<br>

- If we need to access the index of the item while iterating a _list_, we use the built-in `enumerate()` function to provide the index and the value to a `for` loop:

	```python
	for idx, color in enumerate(colors):
		print(idx, color)
	> 0 red
	> 1 green
	> 2 blue
	```

---
## ❓ Dictionary & List Review Questions

1. **What are _dictionaries_ similar to in JS?**

2. **What are _lists_ similar to in JS?**

3. **Why won't the follow code work?**

	```python
	menu = {
		hamburger: 4.99,
		french_fries: 1.99,
		taco: 2.99
	}
	```

4. **What is a way to add items to a _list_?**

5. **What is a way to remove an item from the front of a _list_?**

---
## List Comprehensions

---
### List Comprehensions
<br>

- One of the most powerful features in Python are _list comprehensions_.

- _List comprehensions_ provide a concise way to create and work with lists.

- They will probably seem a little confusing as first, but they certainly are a favorite of _Pythonistas_ and you will certainly come across them when googling.

---
### List Comprehensions<br><small>Numerical Example</small>
<br>

- If we needed to square all of the numbers in a _list_ and put them into a new _list_, we might use a for loop like this:

	```python
	nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
	# I want 'n * n' for each 'n' in nums 
	squares = []
	for n in nums:
		squares.append(n * n)
	print(squares)
	> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
	```

- **What method in JS would we use in this scenario?**

---
### List Comprehensions<br><small>Numerical Example</small>

- A _list comprehension_ can reduce this code:

	```python
	# I want 'n * n' for each 'n' in nums 
	squares = []
	for n in nums:
		squares.append(n * n)
	```
	To this:
	
	```python
	# I want 'n * n' for each 'n' in nums 
	squares = [n * n for n in nums]
	```

- The _comprehension_ is basically an advanced `for` loop within _square brackets_ which, of course, returns a new _list_.

---
### List Comprehensions - Basic Syntax
<br>

- Here's the basic syntax of a _list comprehension_:

	```python
	# [<expression> for <item> in <list>]
	# This reads as: I want <expression> for each <item> in <list>
	```

---
### List Comprehensions - Filtering

- We've seen how _list comprehensions_ are a nice way to map a list, but they can be used for **filtering** too.

- Again, we'll start by using a `for` loop to map and filter simultaneously:

	```python
	nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
	# I want 'n * n' for each 'n' in nums  if 'n * n' is even
	even_squares = []
	for n in nums:
		square = n * n 
		if square % 2 == 0:
			even_squares.append(square)
	print(even_squares)
	> [4, 16, 36, 64, 100]
	```


---
### List Comprehensions - Filtering

- Again _list comprehensions_ reduce the mapping and filtering from:

	```python
	# I want 'n * n' for each 'n' in nums  if 'n * n' is even
	even_squares = []
	for n in nums:
		square = n * n 
		if square % 2 == 0:
			even_squares.append(square)
	```
	To this one-liner:
	
	```python
	# I want 'n * n' for each 'n' in nums  if 'n * n' is even
	even_squares = [n * n for n in nums if (n * n) % 2 == 0]
	```
	Nice and readable!

---
### ❓ List Comprehensions - Review Questions
<br>

1. **What characters start and end a _list comprehension_**

2. **Does a _list comprehension_ create a new list?**

---
### List Comprehensions - Summary
<br>

- We've only scratched the surface of _list comprehensions_.

- They can even be used to create lists of _tuples_ that would otherwise require nested `for` loops.

- Speaking of **tuples**...

---
## Tuples

---
### Tuples - Purpose
<br>

- **Tuples** in Python are very similar to **lists**.

- _Tuples_ have a class (type) of `tuple`.

---
### Tuples - Basic Syntax
<br>

- _Tuples_ can be defined in a few different ways.  Most basically, they are defined like this:

	```python
	colors = ('red', 'green', 'blue')
	print(colors)
	> ('red', 'green', 'blue')
	print( len(colors) )
	> 3
	``` 
	Although it seems that _parentheses_ are used to create _tuples_, it's actually the _commas_...

---
### Tuples - Basic Syntax
<br>

- For more proof that the use of commas create a tuple, let's say you wanted to create a 1-tuple containing the string of "Hello".

- If parens created tuples, this would work:

	```python
	hello_tuple = ('Hello')
	```
	
	But it doesn't, however, this will:
	
	```python
	hello_tuple = ('Hello',)
	# or the following
	hello_tuple = 'Hello',
	```

---
### Tuples - Basic Syntax
<br>

- _Tuples_ can be created without using any parentheses:

	```python
	colors = 'red', 'green', 'blue'
	print(type(colors))
	> <class 'tuple'>
	```

- However, creating single-item _tuples_ without parens requires a trailing comma:

	```python
	colors = 'purple',  # tuple, not a string
	print(type(colors), len(colors))
	> <class 'tuple'> 1
	print(colors)
	> ('purple',)
	```

---
### Differences Between Tuples & Lists

- _Tuples_ are immutable, so they are great for protecting data that you don't want changed.

- Python iterates over _tuples_ faster than _lists_. _Tuples_ can also be used as _keys_ for _dictionaries_.

- Generally, you'll find that _tuples_ are used to contain heterogeneous (different) data types and _lists_ for homogeneous (similar) data types.

- _Tuples_ are often classified based on how many items they contain, e.g., a **2-tuple** would be used to hold a `key` and its `value`

---
### Tuples - Accessing Items

- Although _tuples_ can't be modified like _lists_, we can retrieve their items in exactly the same way:

	```python
	colors = ('red', 'green', 'blue')
	green = colors[1]
	print(green)
	> green
	```
- _Sequences_ also have an `index()` method that returns the index of the first match:

	```python
	colors = ('red', 'green', 'blue')
	blue_idx = colors.index('blue')
	print(blue_idx)
	> 2
	```
	
---
### Tuples - Iteration
<br>

- Just like with _lists_, other _sequences_ are iterated upon in the same way - by using `for` loops:

	```python
	colors = ('red', 'green', 'blue')
	for idx, color in enumerate(colors):
		print(idx, color)
	> 0 red
	> 1 green
	> 2 blue
	```

---
### Tuples - Unpacking
<br>

- _Tuples_ have a convenient feature, called _unpacking_, for doing multiple variable assignment:

	```python
	colors = ('red', 'green', 'blue')
	red, green, blue = colors
	print(red, green, blue)
	> red green blue
	```
	A tuple of variables on the left-side of the assignment operator and a tuple of values on the right is all it takes.

---
## Sequences Can Be "Sliced"

---
### Slicing Sequences
<br>

- Python is known for having some cool tricks up its sleeve, for one, there's the "slice" operator (`[m:n]`).

- Since _sequence_ types are a collection of items (BTW, characters are the items in a _string_), we can target subsets, called _slices_, of those items using `[m:n]`.

---
### Slicing Sequences
<br>

- Just like with indexing, slicing uses _square brackets_, but adds a _colon_:

	```python
	short_name = 'Alexandria'[0:4]
	print(short_name)
	> Alex
	```

- Note that the slice includes up to, but not including the index to the right of the colon.

---
### Slicing Sequences
<br>

- If the first index is omitted, the slice copies the _sequence_ starting at the beginning:

	```python
	colors = ('red', 'green', 'blue')
	print( colors[:2] )
	> ('red', 'green')
	```
 
- If the up to index is omitted, the slice copies the _sequence_ all the way to the end:

	```python
	colors = ['red', 'green', 'blue']
	print( colors[1:] )
	> ['green', 'blue']
	```

---
### Slicing Sequences - Question
<br>

- **What would the value of `fruit_copy` be?**

	```python
	fruit = ('apples', 'bananas', 'oranges')
	fruit_copy = fruit[:]
	```

---
## Conclusion
<br>

- Python offers amazing power, convenience and readability with features such as _list comprehensions_ and _slicing_.

- However, as usual, it takes practice to become "comfortable" with these concepts, so on to the lab...
