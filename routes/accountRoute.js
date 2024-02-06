// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const { handleErrors } = require("../utilities/index")
const accountController = require("../controllers/accountController") // Brings the invController into scope.



module.exports = router; // exports the router objects to be used elsewhere in the project.