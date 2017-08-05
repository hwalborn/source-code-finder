# Source Code Finder and Highlighter

This is a web application built with React and Express that builds on the already existing application I built out using pure html and JavaScript. A user can search for a url and get the source code displayed in the browser

Once the code is displayed, the user may click on any html element to highlight any elements that correspond. The user may also select the color of the highlight from the dropdown menu

There is also an option to format the text.

The front end makes calls to an external API built with Express

## Some Features:

+ CORS management
+ Express server
+ React
+ Format code
+ Select highlight color
+ Testing using `npm test` with chai and enzyme
+ Basic url sanitization

## Install and run:

### WARNING
If you do not have "concurrently", "webpack", and "webpack-dev-server" installed globally, this will not work. You will need to run `npm install -g {package}` for each one. Once that is done, follow the next steps:

+ Clone the repo
+ `cd` into the correct directory
+ run `npm install`
+ run `npm start` and the browser will open
