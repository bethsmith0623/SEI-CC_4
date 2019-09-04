# exercise-04 What kind of Triangle?

# Write the code that:
# 1. Prompts the user to enter the three lengths of a triangle (one at a time):
#      Enter the lengths of three side of a triangle:
#      a: 
#      b:
#      c:
# 2. Write the code that determines if the triangle is:
#      equalateral - all three sides are equal in length
#      scalene - all three sides are unequal in length
#      isosceles - two sides are the same length
# 3. Print a message such as:
#      - A triangle with sides of <a>, <b> & <c> is a <type of triangle> triangle

sides = print('Enter the lengths of three sides of a triangle.')
a = input('a:')
b = input('b:')
c = input('c:')
equilateral = a == b and a == c and b == c
scalene = a != b and c != a and b != c
if equilateral == True:
    print(f'A triangle with sides of {a}, {b} & {c} is a equilateral triangle')
elif scalene == True:
    print(f'A triangle with sides of {a}, {b} & {c} is a scalene triangle')
else:
    print(f'A triangle with sides of {a}, {b} & {c} is a isosceles triangle')

