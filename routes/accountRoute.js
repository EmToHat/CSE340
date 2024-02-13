// Needed Resources 
const logValidate = require('../utilities/login-validation')
const regValidate = require('../utilities/registration-validation')
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accntController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/');

router.get("/login", accntController.buildLoginView);

router.get("/register", accntController.buildRegisterView);

// Process the login data
/* 
  router.post(
    "/login",
    logValidate.loginRules(),
    logValidate.checkLoginData,
    //Util.handleErrors(accntController.registerNewAccount)
  )
*/

// Team Activity (Temporary)
// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)


// Process the registration data
router.post(
  "/register",
  regValidate.regRules(),
  regValidate.checkRegData,
  Util.handleErrors(accntController.registerNewAccount)
)

module.exports = router; // exports the router objects to be used elsewhere in the project.