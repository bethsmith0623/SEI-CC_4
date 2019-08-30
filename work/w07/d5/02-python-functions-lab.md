<img src="https://i.imgur.com/Q5SFLV2.png">

# Python Function Lab

## Intro

Time to practice some Python by writing functions that solve the four challenges below.

To test your functions, be sure to call each function at least once and `print` the returned value.

##### This Lab is NOT a Deliverable

## Set Up

You may write the functions in a `.py` file or use a Python repl in repl.it

## Challenges

1. Write a function named `sum_to` that accepts a single integer, `n`, and returns the sum of the integers from 1 to `n`.
	
	For example:

	```python
	sum_to(6)  # returns 21
	sum_to(10) # returns 55
	```

2. Write a function named `largest` that takes a list of numbers as an argument and returns the largest number in that list.

	For example:
	
	```python
	largest([1, 2, 3, 4, 0])  # returns 4
	largest([10, 4, 2, 231, 91, 54])  # returns 231
	```

3. Write a function named `occurances` that takes two string arguments as input and counts the number of occurances of the second string inside the first string.

	For example:

	```python
	occurances('fleep floop', 'e')   # returns 2
	occurances('fleep floop', 'p')   # returns 2
	occurances('fleep floop', 'ee')  # returns 1
	occurances('fleep floop', 'fe')  # returns 0
	```

4. Write a function named `product` that takes an *arbitrary* number of numbers, multiplies them all together, and returns the product.<br>(HINT: Review your notes on `*args`).

	For example:
	
	```python
	product(-1, 4) # returns -4
	product(2, 5, 5) # returns 50
	product(4, 0.5, 5) # returns 10.0
	```

## Solutions (do not peek unless you are stuck or finished)

<details>
  <summary><strong>Challenge 1</strong></summary>

  ```python
  def sum_to(num):
    sum = 0
    for n in range(1, num + 1):
      sum += n
    return sum
  ```
</details>

<details>
  <summary><strong>Challenge 2</strong></summary>

  ```python
  def largest(nums):
    largest = 0
    for num in nums:
      if num > largest:
        largest = num
    return largest
    
  # Sort the list approach
  def largest(nums):
    nums.sort()
    return nums[-1]
  ```
</details>

<details>
  <summary><strong>Challenge 3</strong></summary>

```python
def occurances(string, substr):
  # remove each occuance of substr
  stripped_string = string.replace(substr, '')
  # compute based on length of the strings
  return (len(string) - len(stripped_string)) // len(substr)
	
# Python actually has a method to solve this too!
def occurances(string, substr):
  return string.count(substr)
```
	
</details>

<details>
  <summary><strong>Challenge 4</strong></summary>

  ```python
  def product(*args):
    product = 1
    for arg in args:
      product *= arg
    return product
  ```
</details>
