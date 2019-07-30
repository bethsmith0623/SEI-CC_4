[Click here to view as a presentation](https://presentations.generalassemb.ly/5d66a759b3842b4a06659d1d73da25b6#/1)

---

<img src="https://i.imgur.com/oY0P1r0.png" width="400">

# JS Classes

---
## Learning Objectives
<br>

<p>Students will be able to:</p>

- Describe the use case for _classes_
- Describe _encapsulation_ in OOP
- Define a _class_
- Instantiate a _class_
- Include and use a _constructor method_ in a class
- Define _prototype (instance)_ methods in a class
- Recognize _constructor functions_ (predecessor to classes)
- Define _static (class)_ methods
- Use _extends_ to create a _subclass_
- Use _super_ within a subclass

---
## The Use Case of <em>Classes</em>
---
### What Are <em>Classes</em>?
<br>

- In **object oriented programming (OOP)**, we use objects to model our application's purpose.

- **Classes** (as well as their predecessor, **constructor functions**) are used to create objects.

- Think of classes as the blueprints used to create objects of a certain "type"...

---
### What Are <em>Classes</em>?
<br>

<img src="https://i.imgur.com/Pjxlpjs.jpg" width="600">

---
### Why Use <em>Classes</em>?
<br>

- We've already been creating JS objects using object  ___________ notation.

- So why do we need classes and/or constructor functions?

- Because the number of a certain type of object needed by an application often varies at runtime; and...

- Classes/constructors provide a convenient way to dynamically create objects as needed.

---
## Encapsulation in OOP

---
### Encapsulation in OOP

- **Encapsulation** is a key principle of Object Oriented Programming.

- Encapsulation is the concept of bundling data (properties/attributes) and related behavior (methods) within an object.

- Here comes a graphic depicting this principle...

---
### Encapsulation in OOP
<br>

<img src="https://i.imgur.com/7e0Qa9K.png" width="600">

---
### Encapsulation in OOP

- Here's a code example of encapsulating data (attributes/properties) & behavior (methods):
<br><br>

```js
var cohort = {
  id: 'SEI',
  students: ['Mary', 'Toni', 'Fred'],
  instructors: ['Susan', 'Phil'],
  addStudent: function(name) {
    name = name[0].toUpperCase() + name.substr(1).toLowerCase();
    this.students.push(name);
  },
  pickRandomStudent: function() {
    var rndIdx = Math.floor(Math.random() * this.students.length);
    return this.students[rndIdx];
  }
};
```
---
### Review Questions
<br>

- **What does the acronym OOP stand for?**

- **In your own words, describe why Classes exist in OOP.**

- **In your own words, describe the OOP principle known as _encapsulation_.**

---
### Defining Classes in JS
<br>

- Here's a minimal class definition that's good for nothing but creating empty objects:

	```js
	class Vehicle {
	  // Code to define the class's properties and methods
	}
	```

- Looks similar to defining a function because classes are in fact, _special_ functions, except...

**What's different compared to a function?**<br>**What's different about the naming convention?**

---
### Instantiating a Class
<br>

- Here's a bit more OOP vocab for you:

	- **instance**: An object created by a class

	- **instantiate**: We instantiate a class to create an object

	- **instantiation**: The process of creating an object

- In JS, we create objects using the `new` keyword when invoking (instantiating) the class:

	```js
	var v1 = new Vehicle();
	```
	Let's use _repl.it_ to try out the minimal `Vehicle` class

---
### The _<span style="text-transform:lowercase">constructor</span>_ Method
<br>

- When a class is being instantiated, the special `constructor` method in the class will **automatically** be called:

	```js
	class Vehicle {
	  constructor(vin, make) {
	    this.vin = vin;
	    this.make = make;
	    // return is not needed 
	    // because the new object is returned by default
	  }
	}
	
	var plane = new Vehicle('X123Y', 'Boeing');
	```

---
### The _<span style="text-transform:lowercase">constructor</span>_ Method
<br>

- **The purpose** of the `constructor` method is to initialize the data properties of the new object being created (represented by `this`).

- If there are no properties to initialize, the `constructor` method is optional (a hidden default constructor is called).


---
### Practice - Add a Property
<br>

- **Modify the `Vehicle` class by adding an additional property named  `model`.**

- Test it out by instantiating another object like this:

	```js
	var car = new Vehicle('A1234', 'Toyota', 'Camry');
	```

---
### Object Instantiation

- When we invoke the class prefaced with the `new` keyword, behind the scenes:
	- JS creates a shiny new object (empty) and assigns it to the `this` keyword.
	- The `constructor` method is called with the arguments we provided when invoking the class. Remember, the `constructor` method is where we create/initialize properties on the new object assigned to `this`.
	- After the `constructor` is finished executing, the class automatically returns the shiny new object.

- Although the `constructor` method is _special_ because it's called automatically, there's nothing special about how it's defined, other methods are defined the same way...

---
### Defining Methods in a Class
<br>

- There are two types of methods that can be added to a class:
	- **Prototype (instance) methods**, and
	- **Static (class) methods**

- **Prototype methods** are the most common and are available to be called by any instance of the class.<br>**What's an instance?**

- **Static methods** are methods that are called on the class itself and cannot be called by instances.

---
### Defining Methods in a Class

- Let's add a `start` method to our `Vehicle` class:

	```js
	class Vehicle {
	  // the constructor will always be called
	  constructor(vin, make, model) {
	    this.vin = vin;
	    this.make = make;
	    this.model = model;
	    this.running = false;  // default to false
	  }
	  start() {
	    this.running = true;
	    console.log('running...');
	  }
	}
	```

- Note that unlike within object literals, methods are not separated by a comma.

---
### Practice - Defining Methods
<br>

- **Define a `stop` method that sets the `running` property to `false` and console.logs the message "stopped..."**

---
### Overriding Methods
<br>

- Thanks to another OOP principle called _inheritance_, **subclasses** inherit methods from their parent classes.

- JS is different from class-based languages like Java or Python in that its inheritance implementation is _prototype-based_.  We won't go into prototypes during this lesson, but if you want to learn more, [check out the docs here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

- In JS, virtually every object inherits from the `Object` class and thus inherits it's methods, such as `toString`:

	```js
	car.toString() // outputs something like '[object Object]'
	```

---
### Overriding Methods
<br>

- If we define a method that already exists in the object hierarchy, we "override" it. For example, we can override the Object's `toString` method by adding it to our class:

	```js
	  // existing methods above
	  
	  toString() {
	    return 'Vehicle (' + this.vin + ') is a ' +
	      this.make + ' model ' + this.model;
	  }
	```
	Test it out.

---
### Review Questions

- You've just learned how to define a class and add prototype methods to it.  This represents about 80% there is to know about classes - congrats!<br><br>Some questions before moving on:<br><br>
1. **What is the JS keyword used to define a class?**
2. **What is the name of the method in a class that is automatically called when we instantiate a class?**
3. **What is the main purpose of this method?**
4. **What character(s) separate the methods in a class definition?**

---
### Constructor Functions - B.C. (before classes 😀)
<br>

- Before classes arrived via ES2015, we used _constructor functions_ to do the exact same thing as classes.

- Because of the newness of ES2015, much of the code out there is written using constructor functions, however, most new code today is likely to be written as classes.

- It's important that you be able to recognize _constructor functions_, so let's look at how the `Vehicle` class can be written as a constructor function...

---
### Constructor Functions

```js
function Vehicle(vin, make, model) {
  this.vin = vin;
  this.make = make;
  this.model = model;
  this.running = false;  // default to false
}
Vehicle.prototype.start = function() {
  this.running = true;
  console.log('running...');
};
// other 'prototype' (instance) methods defined like above
	
var car = new Vehicle('A1234', 'Toyota', 'Camry');
```

- Note that constructor functions are similar to the constructor methods in a class. Also note how instance methods are defined on the function's prototype object.

- Invoking a class and a constructor function works identically.

---
### Static Methods
<br>

- Again, _static methods_ are methods that are callable on the class itself - not on its instances.

- Static methods are used typically to implement behavior that does not pertain to a particular instance.  For example, we could design the `Vehicle` class so that it tracks every vehicle it creates.  We could then write static methods that return how many vehicles have been created, search for vehicles by their make, etc.

---
### Static Methods
<br>

- Here's how to define a basic static method:

	```js
	  static about() {
	    alert("I'm the Vehicle class!");
	  }
	```
	Yup, the only difference is the `static` keyword

- As discussed, you invoke static methods on the class:

	```js
	// invoke static methods on the class
	Vehicle.about();
	
	// this will not work
	car.about();
	```

---
### Review Quesitons

- **Is there anything a class can implement that can't be done using constructor functions?**

- **When using constructor functions, how are instance methods defined?**

- **What's wrong with the following code?**

	```js
	class Shape {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	  static getPosition() {
	    return [this.x, this.y];
	  }
	}
	```

---
### Inheritance
<br>

- Earlier we spoke briefly about _inheritance_.

- In OOP, inheritance is when a "specialized" **subclass** is derived from a parent **superclass**, and thus inherits it's properties and methods.

- For example, a `Payment` class could have `CreditCard` & `Cash` subclasses derived from it.

---
### Inheritance
<br>

<img src="https://i.imgur.com/MvXw4nD.gif" width="800">

---
### Inheritance

- We use the `extends` keyword to define a subclass:

	```js
	class Plane extends Vehicle {
	  constructor(vin, make, model, airline) {
	    super(vin, make, model);
	    this.airline = airline;
	  }
	  engageAutoPilot() {
	    console.log('Look Mom, no hands!');
	  }
	}
	```

- In a derived class, the `super` keyword represents the parent superclass and must be called before the `this` keyword can be used in the constructor.

---
### Inheritance

- Now we can create instances of `Plane` like this:

	```js	
	var spyPlane = new Plane('secret', 'Lockheed', 'SR-71', 'USA');
	```

- Note how the additional arguments used to initialize subclasses are always provided after those intended for the superclass(es).

---
### Inheritance

- In complex systems, it's not uncommon to have several layers of inheritance - often referred to as an object hierarchy.

<img src="https://i.imgur.com/t9eUguh.png" width="700">

---
### Practice - Inheritance
<br>

- **Define another subclass of the `Vehicle` class named `Automobile` with an additional property of `numDoors` and a `honk` method.**

- Test it out by instantiating it like this:

	```js
	var fastCar = new Automobile('TS123Z', 'Tesla', 'P100D', 4);
	```

- Hint: It's okay to copy and paste your own code (but make sure you understand what it does)

---
### Final Notes on Classes
<br>

1. Unlike function declarations, class declarations are not _hoisted_ - they must be declared before using them to create objects.

2. It's possible to subclass JS's built-in "classes"! For example:

	```js
	class Stack extends Array {
	  get top() {
	    return this[this.length - 1];
	  }
	}
	```

---
## References

- [Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

- [Prototypal Inheritance example](https://gist.github.com/jim-clark/e3fc426d73153fac6dc1)