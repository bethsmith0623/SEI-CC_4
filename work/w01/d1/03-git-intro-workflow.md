<img src="https://i.imgur.com/ce7PitU.png">

# Intro to Git & Your Class Repo

## Learning Objectives

| Student will be able to: |
|---|
| Describe what a Version Control System is |
| Describe the difference between Git and GitHub |
| Distinguish between local and remote repositories |
| Fork & clone the class repo to a computer |
| Use basic git commands to retrieve updates to the class repo |
| Use basic git commands to save work to the fork of the class repo | 

## What is version control, and why should you care?

A Version Control System (VCS) records changes to files over time so that you can recall specific versions later.

It also makes working in teams easier, because it enables developers to submit changes to be merged into the codebase.

More specifically, a VCS allows you to:

- Revert files back to a previous state
- Review changes made over time
- Collaborate on a set of files with others
- Create separate "branches" of the codebase to develop new features on without impacting the "master", or production, branch.

In SEI, we'll be using the world's most popular version control system - **git**.

Git was created by Linus Torvolds in 2005 to help with the development of his main project at the time - developing Linux.

## Git vs. GitHub

GitHub is not the same as git. **GitHub** is a social network built around git. It has completely changed the way we, as programmers, share and work on code. GitHub is now the largest online storage space of collaborative works, and it works with git in order to keep track of versions, issues, and requests for changes.

GitHub also plays the important role of a cloud-based backup system - a safe place for all your work!  Your code, and the time you spent writing it, is valuable, therefore, you don't want to risk losing it to hardware failure, etc. So we "connect" our local git repo to a "remote" repo on GitHub where we can then "push" code to, and "pull" code from - on demand.

In summary:

- Git provides us with local repositories on our computers
- GitHub provides us with remote repositories stored in the cloud
- A local repository is "linked" to a remote repository by adding a "remote" with this command `$ git add remote <name of remote> <URL of repo on GitHub>`

## Fork & Clone the Class Repo

This would be a great time to get your computer connected to the class repo where lessons, labs, etc. will be stored.

The README of the class repo describes the workflow and commands you will use to obtain the content of the class repo. Browse there now - your instructor will Slack the link in case you don't have it.

After examining the repo's overall structure, we'll review and follow the instructions laid out in the section entitled **Becoming Familiar With the GitHub Workflow**.

## Saving Your Work on Exercises, Labs, etc.

You will want to save work that you've completed during code alongs, labs, etc.

In fact, you may not be able to pull changes added to the class repo by your instructors until you save your work/changes by committing them.

Do this by following the same instructions we just reviewed [here](https://git.generalassemb.ly/SEI-CC/SEI-CC-2#getting-changes-pushed-by-your-instructors).

## Fork & Clone the Daily Code Challenges Repo

Let's practice forking, cloning and saving work to a repo by setting up and completing today's Daily JS Code Challenge!

1. First, browse [here](https://git.generalassemb.ly/WDI-CC-LIBRARY/daily-code-challenges).
2. Now let's follow the instructions and set up the repo.
3. Move to the `daily-code-challenges` directory.
4. Open in VS Code:  `$ code .`
5. Edit the `challenges.js` file to solve the `01-addOne` challenge.
6. Be sure you have saved the changes in your code editor (`command-s` will do the trick).
7. Now let's commit the changes:
	- `$ git add -A`
	- `$ git commit -m "Solve 01-addOne code challenge`  - saves the changes to the local repo
	- `$ git push origin master` - saves the commit to the remote GHE repo (your fork)
8. Now's the time to provide your instructors with the link to your `daily-code-challenges` repo - please respond the to slack message with the URL in your address bar. Note that this only has to be done once.

Congrats on solving the first daily code challenge, saving your changes to the local repo and pushing it to the cloud!

## Summary of Common Git Commands

By following along today and having done the pre-work, you should now be familiar with basic git commands.

In SEI, you'll get plenty of practice using git, especially during project week because each of your projects will be stored in its own directory and will be made a git repository in that directory tracking the changes.

> IMPORTANT: At some point, you will lose access to the class repo that's hosted on GA's GitHub Enterprise account. Not to worry.  You will of course have all of the materials and your work stored locally. Additionally, at the end of the cohort, you can simply add a new remote that links a repo on your personal GitHub account and push to it - that remote repo will then contain all materials and commits for your labs, practice exercises, code challenges, etc.

For your convenience, there is a git command cheatsheet located in the `resources` section of the class repo. However the following summary of commands will "git" you far:

| Command | Purpose |
|---|---|
| `git init` | Initializes a local repository. Used in lieu of cloning a GitHub repo. All local repos contain a hidden `.git` directory responsible for holding repo-related data. |
| `git status` | Checks and reports on the status of your repo. It will inform you what changes to tracked (staged) files will be included in next commit, if there are any untracked files that have been added to the project or have changes, etc. |
| `git add <path>` | Adds an entire directory or individual file (or files using a `*` as a wildcard) to the "staging area" for the next commit. |
| `git add -A`| Adds all changes within the repo to the staging are for next commit. |
| `git commit -m "<message>"`| Commits all staged changes to the local repo. The message should be in worded such that it describes what the commit **does**, not what it **did**. For example, "Style nav bar" instead of "Styled nav bar".|

This following diagrams the flow of making changes to a repo:
 
<img src="https://i.imgur.com/MGQoFYo.png">

This is the most simple workflow, things get a bit more complex when you start sharing code and manage larger codebases.

> IMPORTANT: Do not create a repo within an existing repo!  If you find your computer very sluggish, it might be because you have "nested" repos. It's not uncommon for students to accidentally make their home folder (`~`) a repo - so start there if you suspect something is wrong.



