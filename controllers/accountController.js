const Util = require("../utilities/")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")

const accController = {} // creates an empty object in the accCont variable.

/* ****************************************
 *  Deliver login view
 * *************************************** */
accController.buildLoginView = async (req, res, next) => {
  let nav = await Util.getNav()
  res.render("account/login", { // views/account/login
    title: "Login Form",
    nav,
  })
};

/* ****************************************
 *  Deliver registration view
 * *************************************** */
accController.buildRegisterView = async (req, res, next) => {
  let nav = await Util.getNav()
  res.render("account/register", {
    title: "Registration Form",
    nav,
    errors: null,
  })
};


/* ****************************************
*  Process Registration
* *************************************** */
accController.registerNewAccount = async function (req, res, next) {
    let nav = await Util.getNav()
    const { 
      account_firstname, 
      account_lastname, 
      account_email, 
      account_password } = req.body
  
    // Hash the password
    let hashedPassword = await bcrypt.hashSync(account_password, 10);

    const regResult = await accountModel.insertNewAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
      //account_password 
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Fantastic! You\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      req.flash(
        "notice", 
        "Sorry, the registration failed."
      )
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }
  }


module.exports = accController;