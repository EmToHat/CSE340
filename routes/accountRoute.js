// Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accountController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/');

router.get("/login", accountController.buildLogin);

router.get("/register", accountController.buildRegister);

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
  )

module.exports = router; // exports the router objects to be used elsewhere in the project.