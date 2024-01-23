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
const inventoryRoute = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")
const Util = require('./utilities/'); // Adjust the path based on your project structure


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

// Index route
app.get("/", Util.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)


/* ***********************
* Basic Error Handling Activity
* 
* File Not Found Route - must be last route in list
* Place after all routes.
*************************/
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'});
});


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await Util.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})


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
