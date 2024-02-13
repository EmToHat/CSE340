// Needed Resources 
const logValidate = require('../utilities/login-validation')
const regValidate = require('../utilities/registration-validation')
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accntController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/');

router.get("/login", accntController.buildLogin);

router.get("/register", accntController.buildRegister);

// Process the login data
router.post(
  "/login",
  logValidate.loginRules(),
  logValidate.checkLoginData()
  //Util.handleErrors(accntController.registerAccount)
)

// Process the registration data
router.post(
  "/register",
  regValidate.regRules(),
  regValidate.checkRegData(),
  Util.handleErrors(accntController.registerAccount)
)

module.exports = router; // exports the router objects to be used elsewhere in the project.