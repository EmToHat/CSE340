/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts") // tells the application to require express-ejs-layouts so it can be used.
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")

/* ***********************
 * View Engine and Templates
 *************************/
// ejs will look for files with the extension .ejs e.g., file.ejs
app.set("view engine", "ejs") // Declares that ejs will be the view engine for our application. 
app.use(expressLayouts) // Tells the application to use this package that is stored into the expressLayouts variable.
app.set("layout", "./layouts/layout") // not at views root, when express ejs layout looks for the basic template for a view, it will find it in the layouts folder with the name layout.

/* ***********************
 * Routes
 *************************/
app.use(static) // the app itself will use this resource, this line of code allows the app to know where the public folder is located and that all of its subfolders will be used for static files.

// Index Route
app.get("/", baseController.buildHome)

/*
app.get("/", function(req, res) {
  res.render("index", {title: "Home"})
})
*/

  // app.get - the express app. watches the "get" object within the HTTP Request for a particular route.
  // "/" - This is the route being watched, indicates the base route of the application or the route which has no specific resource requested.
  // function(req, res){ - A JavaScript function that takes the request and response objects as parameters.
  // res.render() - The "res" is the response object, while "render()" is an Express function that will retrieve the specified view - "index" - to be sent back to the browser.
  // {title: "Home" } - The curly braces are an object (treated like a variable), which holds a name - value pair. This object supplies the value that the "head" partial file expects to receive. The object is passed to the view.
  // }) - The right curly brace closes the function, while the right parentheses closes the "get" route.

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
