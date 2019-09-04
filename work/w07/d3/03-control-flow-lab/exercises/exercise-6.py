# exercise-06 What's the  Season?

# Write the code that:
# 1. Prompts the user to enter the month (as three characters):
#      Enter the month of the season (Jan - Dec):
month = input ('Enter the month of the season (Jan - Dec):')
# 2. Then propts the user to enter the day of the month: 
#      Enter the day of the month:
day = input ('Enter the day of the month (2 digits please):')
# 3. Calculate what season it is based upon this chart:
#      Dec 21 - Mar 19: Winter
if month in ('Dec') and day >= '21':
    print(f'{month} {day} is in Winter')
elif month in ('Jan', 'Feb'):
    print(f'{month} {day} is in Winter')  
elif month in ('Mar') and day <= '19':
    print(f'{month} {day} is in Winter')
#      Mar 20 - Jun 20: Spring
elif month in ('Mar') and day >= '19':
    print(f'{month} {day} is in Spring')
elif month in ('Apr','May'):
    print(f'{month} {day} is in Spring')   
elif month in ('Jun') and day <= '20':
    print(f'{month} {day} is in Spring')
#      Jun 21 - Sep 21: Summer
elif month in ('Jun') and day >= '21':
    print(f'{month} {day} is in Summer')
elif month in ('Jul','Aug'):
    print(f'{month} {day} is in Summer')   
elif month in ('Sep') and day <= '21':
    print(f'{month} {day} is in Summer')
#      Sep 22 - Dec 20: Fall
elif month in ('Sep') and day >= '22':
    print(f'{month} {day} is in Fall')
elif month in ('Oct', 'Nov'):
    print(f'{month} {day} is in Fall')
elif month in ('Dec') and day <= '20':
    print(f'{month} {day} is in Fall')

# 4. Print the result as follows:
#      <Mmm> <dd> is in <season> 

# Hints:
# Consider using the in operator to check if a string is in a particular list/tuple like this:
# if input_month in ('Jan', 'Feb', 'Mar'):
#
# After setting the likely season, you can use another if...elif...else statement to "adjust" if
# the day number falls within a certain range.