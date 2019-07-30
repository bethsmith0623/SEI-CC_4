# Project 1 - Peer Code Review Checklist

### Developer: ________________________
### Reviewer: _________________________
---

## Minimum Requirements

### Features
- [ ] Game has at least the minimum set of features required to play.
- [ ] All minimum features are working.
- [ ] As applicable, does the game handle "winning", "losing" and "ties"?

### Code Style & Best Practices
- [ ] No "dead" code (code that is commented out code or is never executed) exists.
- [ ] There are separate CSS & JS files put in appropriate sub-folders.

#### JavaScript
- [ ] Function names accurately express their purpose (usually verbs).
- [ ] Variable names are clear and expressive (usually nouns).
- [ ] Identifiers used for variables and functions (except constructors) use camel-casing.
- [ ] Constructor functions use upper-camel-casing.
- [ ] JavaScript code blocks, nested functions, etc., are consistently indented using 2 or 4 spaces per level of indentation.
- [ ] Vertical white spacing is consistent.
- [ ] Use of single vs. double quotes for strings is consistent (lean toward single quotes).
- [ ] No leftover logging to the console.

#### HTML Markup
- [ ] The HTML is properly indented according to its nesting level.
- [ ] Lower-case is used for all tag names, attributes, classes & ids.
- [ ] Kebob-casing is used for names of classes, ids, and custom attributes (if any).
- [ ] No spaces exist between HTML attributes, the equal sign and the value.
- [ ] HTML attributes use double quotes.
- [ ] Inline styling is not used.

#### CSS
- [ ] The CSS is properly indented.
- [ ] Vertical white space is consistent.
- [ ] There is an opening curly brace after the selector(s) and a closing brace on the last line by itself.
- [ ] CSS properties contain a space after, but not before, the : character.

### Documentation & Deployment
- [ ] Game is deployed online (GH Pages).
- [ ] Repo contains a _readme.md_
- [ ] _readme_ has a _Description_ section for the game.
- [ ] _readme_ has a _Technologies Used_ section.
- [ ] _readme_ has a _Getting Started_ section which includes a link to the deployed game.
- [ ] _readme_ has an _Next Steps_ section to explain unsolved problems and future plans.

## Other Conventions & Best Practices

### Files
- [ ] File names are lowercased and use either snake or kebob-casing.

### JavaScript
- [ ] Functions rarely contain more than 10 lines and do so for good reason.
- [ ] Code is DRY by ensuring there are not sections of similar code.  Repetitive code is put into more general purpose functions defined with parameters as necessary to differentiate their behavior.
- [ ] The main script file is commented into major sections for:
	- Application-wide Variables & cached DOM Element Variables
	- Constants (all upper-case identifier is used by convention)
	- Event Listeners
	- Functions
- [ ] Application-wide scoped variables are declared at the top of the main script file.
- [ ] An _initialize_ or similar function is used to "reset" the variables of the game to their starting state.  Variables are not also being initialized when defined.

### HTML
- [ ] HTML passes [w3c validation](https://validator.w3.org/)

### CSS
- [ ] CSS is kept DRY by breaking out common CSS properties into separate classes.


