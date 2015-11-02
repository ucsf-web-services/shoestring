# Contribute to the UCSF Shoestring Project

So you want to help out with development?  **That's Fantastic**.  Here is how you can get started:

## Getting Started (becoming part of the community)

Updating documentation is important, and the people using the product don't tend to read the documenation so your comments are very valuable! 

1. We recommend adding issues in the documentation first. This is great way to introduce yourself to the project team.
2. And we love it when people update the documentation when they resolve thier issues.
3. Next we recommend detail bug reports issues
4. Bug fixes are the next level up :)
5. Last is grabbing features from the issue queu and fixing them

## Overview of the contribution process

1. [Initial Setup](#initial-setup).
2. Create a branch for your work.
3. Make your changes.
4. Commit your changes with a good [Commit Message](#commit-message).
5. Push your branch to your fork on Github.
6. [Create a pull request](#create-a-pull-request-on-github) so we can review, discuss, and merge your changes.

### Initial Setup

1. Make sure you have a [GitHub account](https://github.com/signup/free).
2. Fork the repository in GitHub with the 'Fork' button.
3. Clone your forked repo locally and cd into your working directory
3. Run ```./installer.sh``` in the shoestring directory to install all dependencies.
* note: ./installer.sh is currently only setup for osx machines.

Alt: If you are on windows or linux and can't run the installer script, the current dependencies are needed to contribute and run shoestring locally.

- Ruby
- Node
- Bundler
- Npm

### Commit Message

Some good rules for commit messages are

 * the first line is commit summary, 50 characters or less,
 * followed by an empty line
 * followed by a longer explanation of the commit if necessary

The first line of a commit message becomes the **title** of a pull
request on GitHub, like the subject line of an email.  Including
the key info in the first line will help us respond faster to
your pull.

### Create a Pull Request on Github

Go to *your* GitHub repository at
https://github.com/my-github-username/shoestring,
switch branch to your topic branch and click the 'Pull Request' button.
You can then add further comments to your pull request.
