# exercise-05 Fibonacci sequence for first 50 terms

# Write the code that:
# 1. Calculates and prints the first 50 terms of the fibonacci sequence.
# 2. Print each term and number as follows:
#      term: 0 / number: 0
#      term: 1 / number: 1
#      term: 2 / number: 1
#      term: 3 / number: 2
#      term: 4 / number: 3
#      term: 5 / number: 5
#      etc.

# Hint: The next number is found by adding the two numbers before it

idx = 0
a = 0
b = 1
while idx < 50:
    if idx < 2:  
        print(f'term: {idx} / number: {idx}') #prints the first 2 given nums
    else:
        num = a + b  #adds to create next num
        print(f'term: {idx} / number: {num}')  #prints next num
        a = b  #reassigns a
        b = num  #reassigns b
    idx += 1  #increases index by 1
