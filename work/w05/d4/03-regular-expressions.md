<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

[Click to View this Presentation](https://presentations.generalassemb.ly/270b02e3881bb7df6f8e#/1)

---

![](https://i.imgur.com/mf5JIkm.jpg)

# Regular Expressions

---

## Learning Objectives
<br>

- Not be mystified by Regular Expressions

- Write basic Regular Expression patterns

- Use RegEx patterns to validate HTML `<input>` tags

---

### What are Regular Expressions?

- A **sequence of characters** that define a pattern that is used to search/match, and optionally replace, text in strings and files.

- Grounded in Computer Science and used throughout computing by:

  - Programming languages

  - Word processors & text editors

  - System utilities like Unix's `grep`

- So comprehensive, they are their own computer language.

- They are very useful for things like web scraping and validation!

---

### Regular Expression Patterns
<br>

- To start, we're going to use the code playground, [codepen.io](http://codepen.io/pen/), to play with regex's in HTML `<input>` elements.

- Create a new pen, and hide the JS pane.

- In the HTML pane, let's add a simple form:

	```html
	<form>
		text: <input type="text" required pattern="Fred">
	</form>
	```

---

<p style="text-align:left">Put this in your pen's CSS pane:</p>

```css
body {
  font: 14pt Helvetica;
}
form {
  padding: 50px;
  border: 4px solid lightgreen;
  border-radius: 20px;
}
form:invalid {
  border-color: yellow;
}
input {
  font: 14pt Helvetica;
  margin: 10px;
  padding: 4px;
}
input:invalid {
  border-color: red;
}
```

---

### Regular Expression Patterns (cont.)
<br>

- We won't need to change our CSS going forward, so go ahead and hide the CSS pane.

- Just to get orientated, this is what a regular expression to match/validate a typical 10-digit phone number like `(310) 555-1212` looks like in JS and Ruby:

	```js
	/^\(\d{3}\)\s\d{3}-\d{4}$/
	```

- Crazy looking stuff - yes? Don't sweat it, by the end of the lesson, this gibberish will all make sense.

---

### Validating Text in an <span style="text-transform:lowercase">\<input></span>
<br>

- Let's take a look at a common and practical use for regular expressions - one that you can start applying to your apps pronto.

- HTML5 `<input>` elements have a `pattern` attribute just for regex patterns.

---

### Validating Text in an <span style="text-transform:lowercase">\<input></span>
<br>

- If the text in the `<input>` does not **completely** match the regular expression:

	- The submit button will not submit the form to the server.
	- The `<form>` will have the `:invalid` CSS pseudo-class applied to it.

---

### Patterns - <em>Literal Characters</em>
<br>

- The first type of characters within a regex pattern up discussion are **literal characters**.

- A **literal** is the most basic of the regex characters. They are _literally_ the character we want to match.

- The first regex we have put in our `<input>`, `pattern="Fred"`, has a pattern, `fred` that consists entirely of literal characters.

---

### Patterns - <em>Literal Characters</em> (cont.)
<br>

- Type "Fred" and you will see the form's border turn green indicating a match!

- **Reminder:** We are looking at regex's initially within the context of an HTML `<input>` element. If this were an ordinary regular expression, our pattern, `Fred`, would match the first occurrence of the letters `Fred` **anywhere** within a string such as<br>_Say hi to Fredrick, aka Fred, when you see him_.

---

### Patterns - <em>Character Class</em>
<br>

- Next up is a **character class**.  They tell the regex engine to match only one of several characters placed within square brackets.

- Lets change our pattern to `gr[ae]y`.

- Check it out!

---

### Patterns - <em>Character Class</em> (cont.)
<br>

- You can use a hyphen inside of a character class to specify a range of characters. For example, `[5-9]` will match a single digit of 5 to 9.

- You can use more than one range too. This pattern, `[0-9a-fA-F]`, would would match any single hexadecimal digit regardless of case.

- Character classes are great for matching frequently misspelled words like `li[cs]en[cs]e`.

---

### <em>Character Class</em> - Question
<br>

<p>What regular expression could be used to match your name whether it is capitalized or not?</p>

---

### Negated Character Class
<br>

- Putting a `^` (caret) symbol after the opening `[`, means match any character **except** the character(s) in the brackets.

- So, `p[^ua]` will match the letter `p` followed by any single character except a `u` or `a`.

---

### Shorthand Character Classes
<br>

- Because character classes are used so often, there are several _shorthand character classes_ available. For example, instead of using `[0-9]` to match a digit, you can use `\d` instead.

---

### Shorthand Character Classes
<br>

- Here are more shorthand character classes:

	- **`\w`** will match any alphanumeric character, including digits and the underscore character.

	- **`\s`** will match any "whitespace" character, including a space, tab, newline and carriage return.

	- **`.`** (period) will match any character except line breaks.

- Google will be your friend when working with regular expressions, unless you work with them frequently, there's no way to remember all this stuff!

---

### More Negativity
<br>

- Interestingly, the uppercase versions of the previous shorthands match just the opposite of the lowercase versions:

	-  `\D` will match any character except a digit.

	-  `\W` will match anything but an alphanumeric character (and underscore).

	-  `\S` will match anything except a space, tab, newline or return.

---

### Exercise (5 mins)
<br>

- Based upon what you've learned already, work with a pair and:<br><br>**Write a regex pattern that will match:<br>The word "File", followed by a space and two uppercase letters from the alphabet, followed by a hyphen and three digits, except that the first of the three digits cannot be a zero.**

- For example, this text would be a match:<br>`File XY-123`

---

### Solution
<br>

- `File [A-Z][A-Z]-[1-9][0-9][0-9]`

- Note that there is no shortcut character class to match a letter from the alphabet only, so we must use:<br>`[a-z]` (lowercase),<br>`[A-Z]` (uppercase)<br>or `[a-zA-Z]` (upper or lowercase)

---

### Quantifiers
<br>

- In the previous exercise/solution, we repeated the same character classes when we wanted to match more than one. Well, there's a better way using **quantifiers**.

- There are four different quantifiers:

	- **`{}`**

	- **`*`**

	- **`+`**

	- **`?`**

- Let's see how they work...

---

### Quantifiers - <span style="text-transform:lowercase">{}</span>
<br>

- We use curly braces to specify a specific quantity, or range of quantities, to repeat a literal character, character class, etc.

- For example, `\d{3}` would match three digits.

- **What regex pattern could you use to match a social security number with this format:<br>`###-##-####`**

---

### Quantifiers - <span style="text-transform:lowercase">{}</span> (cont.)
<br>

- We can also specify a range like `[A-Z]{1,5}`, which would match between 1 and 5 capital letters.

- A range from a number to infinity can be created by leaving off the second number such as this `{5,}`.

- Note that regular expressions by default are "greedy", that is, they will match as many characters as possible (longest possible match).

---

### Other Quantifiers
<br>

- In addition to the `{min,max}` quantifier, there are repetition operators:

	- **`*`** - the star symbol will match the preceding character class zero or more times.

	- **`+`** - the plus symbol will match the preceding character class one or more times.

	- **`?`** - the question mark will match the preceding character class zero or one time.

- **Take 2 minutes to figure out the curly brace equivalents for each of the above repetition operators (\*, + and ?)**

---

### Exercise (5 mins)
<br>

- With your pair:<br>
**Write a pattern that would match a street address where the address:<br> - Starts with 1 to 5 digits (no leading zero)<br> - Followed by a space<br> - Followed by a street name beginning with a capital letter, then 1-n characters, including spaces.**

- For example, this text would be a match:<br>`123 Main Street`

---

### Possible Solution
<br>

`[1-9][0-9]{0,4} [A-Z].+`

---

### Escaping Special Characters
<br>

- We've seen how certain characters such as these, `/*+?.[]{}`, have special meaning in regular expressions.

- That being the case, how do we match these special characters as a literal character?  For example, what if you wanted a pattern to match a number that includes a decimal point?

---

### Escaping Special Characters (cont.)
<br>

- To accomplish this, you have to _escape_ the special character by preceding it with a `\` (backslash), for example, `\+`, would match the plus symbol.

- Note that we do not have to escape special characters within a _character class_ (square brackets).  So, if you wanted to match a plus or minus sign, you could use this pattern<br>`[+-]`.


---

### Practice (3 mins)
<br>

1. **Write the regular expression that would match a floating-point number with one or more digits on both sides of the decimal.**

2. **Write the regular expression that would match this text:<br>`What?`**

---

### Solution
<br>

1. `\d+\.\d+`

2. `What\?`

---

### Regular Expressions in JavaScript
<br>

- Before we begin to work with more complex regular expressions, lets use the console in Chrome's DevTools to check them out using JavaScript.

- In JavaScript, regular expressions are special objects that can be created using a _regular expression literal_, or the _RegExp()_ constructor function.

---

### Regular Expressions in JavaScript (cont.)
<br>

- The literal syntax uses forward slashes to delimit the regex:

	```javascript
	var re = /cats?/;
	```

- The literal syntax is the best option if you know the pattern you want to use in advance.  However, using the constructor approach allows you to pass in a string variable to create a regex dynamically:

	```javascript
	var s = "cats?";
	var re = new RegExp(s);
	```

---

### Regular Expressions in JavaScript (cont.)
<br>

- A regex object has a `test()` method that returns `true` if there is at least one match:

	```js
	var re = /cats?/;
	re.test('fatcat');   // returns true
	```

---

### Practice (3 mins)
<br>

- **Create a JS regex in the console that would match a phone number with the following format:<br>`(###) ###-####`**


	Hint, the parenthesis are _special characters_, **so we have to _________ them**.

- **Use the `test` method on the regex to test some phone numbers.**

---

### Solution
<br>

- Note the use of backslashes to escape the parens:

	```js
	var re = /\(\d{3}\) \d{3}-\d{4}/;
	```

- [These docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) discuss working with regular expressions in JavaScript, including the methods on _Strings_ as well as the _test()_ and _exec()_ methods of the _regular expression_ object.

---

#### JavaScript Methods Using Regular Expressions
<br>

<table class="standard-table">
 <thead>
  <tr>
   <th scope="col">Method</th>
   <th scope="col">Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec" title="The exec() method executes a search for a match in a specified string. Returns a result array, or null."><code>exec</code></a></td>
   <td>A <code>RegExp</code> method that executes a search for a match in a string. It returns an array of information.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" title="The test() method executes a search for a match between a regular expression and a specified string. Returns true or false."><code>test</code></a></td>
   <td>A <code>RegExp</code> method that tests for a match in a string. It returns true or false.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match" title="The match() method retrieves the matches when matching a string against a regular expression."><code>match</code></a></td>
   <td>A <code>String</code> method that executes a search for a match in a string. It returns an array of information or null on a mismatch.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search" title="The search() method executes a search for a match between a regular expression and this String object."><code>search</code></a></td>
   <td>A <code>String</code> method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace" title="The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match."><code>replace</code></a></td>
   <td>A <code>String</code> method that executes a search for a match in a string, and replaces the matched substring with a replacement substring.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" title="Technical review completed."><code>split</code></a></td>
   <td>A <code>String</code> method that uses a regular expression or a fixed string to break a string into an array of substrings.</td>
  </tr>
 </tbody>
</table>

---

### A Great Site for Regex's
<br>

- As me move into more complex regular expressions, the [regex101.com](https://regex101.com/#javascript) web app will provide us with a better tool to learn and practice with.

- Open it up in place of codepen.

---

### Alternation

- Alternation allows us to easily search for one of several characters or words.

- Let's say you want a single regex that will match any of these sentences:<br>_I have a dog._<br>_I have a cat._<br>_I have a bird._<br>_I have a fish._

- This would do the trick<br>`/I have a (dog|cat|bird|fish)\./`.

---

### Exercise (5 mins)
<br>

- **Write a regex that would match a CSS color hexadecimal (3 or 6 characters), such as<br>`#f355Ac` or `#D39`**

---

### Solution
<br>


- Solution:

	```js
	/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/
	```

- **Why can't we use the alphanumeric character shortcut `\w`, in place of the much longer `[a-fA-F0-9]`?**

---

### Grouping
<br>

- Parentheses are used inside regular expressions to create groups that can then have a quantifier applied to the group as a whole.

- Whereas, the square brackets character class, `[]`, represents a **single** character to match, the parentheses, `()`, represent a **group** of characters to match.

---

### Grouping (cont.)
<br>

- Let's say we wanted to match a computer's IP Address. Ignoring the fact that we should limit the numbers to between 0 and 255, we could write something like this:<br>`/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/`

- But using grouping we can shorten this to:<br>`/(\d{1,3}\.){3}\d{1,3}/`

---

### Exercise (2 mins)
<br>

- **Write a regular expression that would match this string:<br>`hey!hey!hey!`**

---

### Solution
<br>

```js
/(hey!){3}/
```

---

### Anchors and Boundaries
<br>

- Anchors and boundaries are unique in that they don't match a character, instead they match a _position_.

- They allow us to write patterns that match strings that contain only the characters we are interested in and only if they are isolated the way we want them to be.

---

### Anchors and Boundaries (cont.)
<br>

- The `^` symbol is used to match the start of the line. This is very useful for processing a file containing multiple lines.

- The `$` symbol matches the end of the line.

- For example, without boundaries, the regex `/dog/` will return _true_ when tested against any of these strings: "dog", "dogs" and "My dog is named Spot".  However, the regex `/^dog$/` will match only the string "dog" and when there is no other text in the line.

---

### Anchors and Boundaries (cont.)
<br>

- Let's test the pattern, `cat`, with anchors (`/^cat$/`), and without (`/cat/`), against the strings "cat" and "catsup".

---

### Anchors and Boundaries (cont.)
<br>

- There is also `\b`, which matches a position called a<br>_word boundary_. The `\b` will match any of the following:

	- Before the first character in the string.

	- After the last character in the string.

	- Between two characters in the string where one character is a word character and the other is a non-word character such as a space, tab, or newline.

---

### Anchors and Boundaries (cont.)

- The `\b` easily allows us to search for whole words only.

- This is how could use the string `match()` method to return the matches by passing in a regex:

```js
// try with no word boundary
var re = /cat/g;
var matches = "The catsup was eaten by the cat".match(re);
// ["cat", "cat"]

// try using word boundary
var re = /\bcat\b/g;
var matches = "The catsup was eaten by the cat".match(re);
// ["cat"]
```
The `g` at the end of the regex is the _global_ flag and it tells the regex to search for all matches, instead of just the first.

---

### Capturing
<br>

- Parentheses can also be used to define **capture** groups.

- Capturing is when matched text is "captured" into numbered groups.

- These groups can then be reused with a process called backreferencing.

- Capturing is beyond the scope of this lesson. Here's [one of several articles out there](http://techbrij.com/javascript-backreferences-string-replace-regex) should the mood strike you.

---

### Moving Forward
<br>

- We've visited the core of regular expressions, however, we've really only scratched the surface.

- You will surely cross paths with regular expressions during your career as a developer. And when you do, as usual, Google and documentation will be your friend.

- There are several regex playgrounds like _regex101.com_ that we used this morning. Here's another one you can check out: [http://www.regexr.com/](http://www.regexr.com/)

---

### Final Questions
<br>

- **What is a Regular Expression?**

- **What Regular Expression could be used to match a string representing a social security number in this format:<br>`xxx-xx-xxxx`**

- Four exercises follow...

---

### Additional Exercises
<br>

- Now you can have some fun practicing writing four more regular expressions.

- A possible solution follows each of the four exercises.

---

### Additional Practice - 1 of 4
<br>

Match an _American Express Credit Card Number_ which always begin with 34 or 37 and totals 15 digits.

---

### Solution - 1 of 4
<br>

`/3[47]\d{13}/`

---

### Additional Practice - 2 of 4
<br>

Match a full U.S. Phone Number:<br>**+1-(555)-555-5555**

---

### Solution - 2 of 4
<br>

`/\+1-\(\d{3}\)-\d{3}-\d{4}/`

---

### Additional Practice - 3 of 4
<br>

A date in the format:<br>YYYY-MM-DD.<br>YYYY can start with either 19 or 20 only.<br>DD can be anything from 01 to 31, regardless of the month.

---

### Solution - 3 of 4
<br>

`/(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/`

---

### Additional Practice - 4 of 4
<br>

An integer between 0 and 255<br>This is difficult, remember to use the "alternation" (|) operator.

---

### Solution - 4 of 4
<br>

`/(2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])/`

---

## References
<br>

- [Regular Expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

- [RegEx Quick-Start & Cheat Sheet](http://www.rexegg.com/regex-quickstart.html)

- [Online regex tester](https://regex101.com/)
