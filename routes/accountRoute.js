// Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accntController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/');

router.get("/login", accntController.buildLogin);

router.get("/register", accntController.buildRegister);

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accntController.registerAccount)
  )

module.exports = router; // exports the router objects to be used elsewhere in the project.