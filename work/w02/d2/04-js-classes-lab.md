<img src="https://i.imgur.com/VAIePkt.jpg" width="900">

# JS Classes - Lab

## Intro

Now that you've learned about using **classes** in JavaScript to create objects, it's time for some practice!

## Lab

In this lab, you will choose one of the object hierarchies below, **Bank Accounts** or **People**, and write the classes to implement it.

### Bank Accounts

**`BankAccount`** class:

| Derived From | Properties | Methods |
| :---: | :---: | :---: |
| n/a | `ownerName`, `balance`, `acctNum` (generated in constructor - not passed in) | `deposit`, `withdraw` |

**`CheckingAccount`** class:

| Derived From | Additional Properties | Additional Methods |
| :---: | :---: | :---: |
| `BankAccount` | `overdraftEnabled` |  Override `withdraw` to implement overdraft feature |

**`SavingsAccount`** class:

| Derived From | Additional Properties | Additional Methods |
| :---: | :---: | :---: |
| `BankAccount` | None |  Override `withdraw` to disallow withdrawals completely :) |


### People

**`Person`** class:

| Derived From | Properties | Methods |
| :---: | :---: | :---: |
| n/a | `firstName`, `lastName` | `sayHello` |

**`Employee`** class:

| Derived From | Additional Properties | Additional Methods |
| :---: | :---: | :---: |
| `Person` | `company`, `wage` (string), `active` (set to `true` in constructor) | `receiveRaise` (updates `wage`), `terminate` (set `active` to false) |

**`Manager`** class:

| Derived From | Additional Properties | Additional Methods |
| :---: | :---: | :---: |
| `Employee` | `department` | `giveRaise` (calls `receiveRaise` on Employee object passed as arg) |

**`Worker`** class:

| Derived From | Additional Properties | Additional Methods |
| :---: | :---: | :---: |
| `Employee` | `manager` (references a `Manager` object) | Your choice - be creative! |


## Deliverables

This lab is **not a deliverable**.

#### One Solution

Try not to peek, but [here's an implementation](https://repl.it/GjTg/10) of the `People` class hierarchy. 