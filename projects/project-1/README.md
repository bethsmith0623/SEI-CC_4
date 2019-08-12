<img src="https://i.imgur.com/QgojyYY.png" width="400">

# Project 1<br>Browser-based Game

## Overview

Your first SEI project will start out with something fun - **a game!**

Thanks to the amount of logic there is in a game, there's no better app than a game to teach you how to **think like a programmer**!

Everyone will get a chance to **be creative**, and work through some really **tough programming challenges**.  You got your feet wet
with Tic-Tac-Toe, and we built a game during class - now it's time to step it up a notch.

**You will be working individually for this project**. However, your instructors and instructor assistants will be guiding you along with up to ten 15-minute one-on-one sessions.  Be sure to use them wisely.

As a reminder, GA has a zero plagiarism policy - your project's code **must be substantially yours**. **Do not copy code from other similar projects or other sources**.  However, using  lines of code from  StackOverflow to accomplish general techniques/algorithms is okay - an example would be using StackOverflow as a source for code that replaces a character at a certain position in a string. 

Lastly, in addition to presenting your projects next Friday, you will be required to complete a Project 1 Assessment (more in a bit).

---

## Planning & Presentation Requirements

### Planning - Due This Thursday:

- You will share:

	☐ Your choice of game.

	☐ A wireframe of your "main" game screen.

	☐ Pseudocode for the overall game play.

### Presentation - Next Friday:

You will have a maximum of 10 minutes to present your project following these guidelines:


1. **Introduce the Project:**

	☐ Intro your game by paraphrasing the README.
	
2. **Demonstrate the Project:**

	☐ Launch the game by clicking the link in the README.
	
	☐ Play the game! If necessary, manipulate the values of variables in the console to ensure a quick win or loss.
	
3. **Show/discuss your code:**

	☐ Briefly show the HTML & CSS. 
	
	☐ Show the JavaScript and discuss your favorite function.

4. **Share the experience:**

	☐ What was your biggest challenge?
	
	☐ What are your key learnings/takeaways?
	
5. **Q & A + Feedback**

---

## Technical Requirements

### Your App Must:

☐ **Render a game in the browser**.

☐ **Include win/loss logic and render win/loss messages in HTML.** Popup alerts using the `alert()` method are okay during development, but not production.

☐ Include separate HTML, CSS & JavaScript files.

☐ Have **properly indented HTML, CSS & JavaScript**. In addition, vertical whitespace needs to be consistent.

☐ No remaining **dead and/or commented out code** (code that will never be called) .

☐ Have functions and variables that are named sensibly. Remember, functions are typically named as verbs and variables (data) named as nouns.

☐ **Be coded in a consistent** manner. For example, choose between your preference for function declarations vs. function expressions.

☐ **Deploy your game online** using GitHub Pages so that the rest of the world can play your game!

---

## Necessary Deliverables

☐ The code for **a working game that meets or exceeds the above technical requirements, built by you, and hosted on GitHub Pages** (covered next week).

- **A ``README.md`` file** with these sections:

  ☐ **\<Your game's title\>**: A description of your game.  Background info of the game is a nice touch.
  
  ☐ **Screenshot(s):** Images of your actual game.
  
  ☐ **Technologies Used**: List of the technologies used, e.g., JavaScript, HTML, CSS...
  
  ☐ **Getting Started**: In this section include the link to your deployed game and any instructions you deem important. 
  
  ☐ **Next Steps**: Planned future enhancements (icebox items).
  
  > Note: Don't underestimate the value of a well crafted `README.md`. The `README.md` introduces your project to prospective employers and forms their first impression of your work!

☐ **Frequent commits dating back to the very beginning of the project**. Commit messages should be in the present tense, e.g., "Style game board" instead of "Styled game board". **Be sure to create the repo on your personal GitHub account and ensure that it is "public".** 

---

## Choose From the Following Games

> Note: Games are listed in approximate order of increasing difficulty.

1. **War** (the card game)
1. **Blackjack**
1. **Simon** (warning: will require asynchronous timing)
1. **Slot Machine**
1. **Mancala**
1. **Minesweeper**
1. **Roulette**
1. **Video Poker**
1. **Checkers** (no AI required - player vs. player is fine)
1. **Solitaire**
1. **Battleship** (would require a little AI to implement a computer opponent)

**If you have a game not on the list that you'd like to code, please be sure to get approval from your instructor!**

> IMPORTANT:  Because it's important to demonstrate your ability to perform DOM manipulation using JavaScript, all games should be DOM-based, not canvas-based.

---

## Suggestions

- **The BEST advice is to follow the guidelines and principles in the** [Guide to Building a Browser App](https://gist.github.com/jim-clark/6f1919291f6007b2c0b2c93d925d6bac). The guide will give you a step-by-step process to get you started and its MVC design pattern will result in clearer, more concise code that can scale functionality more easily.
- **Theme your game** to give it a more personal touch and make it more unique!
- **Use your Development Tools** (`console.log`, DevTools' debugger, `alert` statements) to debug and solve issues.
- Stick with the **KISS (Keep It Simple Stupid)** principle. Minimum Viable Product (MVP) functionality that looks great is better than extra functionality added to a game without polish.
- If you choose a card-based game, there is a CSS library in the _resources_ directory of the class repo that will help you render **beautiful** cards of any size, front and back.
- **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
- **Consult documentation and other resources** to better understand methods, etc.
- Write **DRY (Don't Repeat Yourself)** code. Check for repeating code and refactor into functions that accept arguments.
- Be sure to review the [Peer Code Review Checklist](./p1-peer-code-review.md) for important tips - your code will be evaluated using this checklist.

---

## Project Feedback + Evaluation

- Your instructors will be evaluating your project during your demonstration as well as reviewing the code in your repo.
- If your instructors determine that your project does not meet the above requirements (denoted using checkboxes), you will be given 3 calendar days to address the deficiencies identified. However, be aware that **there is only a single opportunity to resubmit a project during the course**. For example, if you have to resubmit Project 1, you will not have an opportunity to resubmit Projects 2, 3, or 4.
- Immediately after your presentation, your instructor and/or outcomes may provide you with feedback that will benefit your project and perhaps the projects of other students as well.
- If there is a specific section of code that you would like an instructor to provide additional feedback, please ask!
- After project presentations, there will be a "Project 1 Assessment".

---

## Project 1 Assessment

After all presentations are complete, you will be assigned a Project 1 Assessment.

The goal of the assessment is to gauge your ability to develop a **minimal** front-end web application using HTML, CSS & JavaScript, including your ability to:

- Write HTML that provides the app's overall structure and content. 
- Use CSS to provide styling.
- Use JavaScript to:
	- Define variables that hold application state, cache DOM elements, etc.
	- Select elements in the DOM and assign them to variables.
	- Attach event listeners for browser events, such as `click`, being dispatched by DOM elements.
	- Manipulate a DOM element's content and style. 

You will work on the assessment individually, however, the challenge is "open book", so you will have access to all notes, code, lessons, google, etc.

It is anticipated that it will take 30 - 60 minutes to complete. However, you will have up to 3 hours to complete the assessment.

You will be required to pass 3 of the 4 Project Assessments administered during the course in order to graduate.

