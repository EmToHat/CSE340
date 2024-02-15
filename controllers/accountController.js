const Util = require("../utilities/")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const accController = {} // creates an empty object in the accCont variable.

/* ****************************************
 *  Deliver login View
 * *************************************** */
accController.buildLoginView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/login", { // views/account/login
    title: "Login Form",
    nav,
  })
};

/* ****************************************
 *  Deliver registration View
 * *************************************** */
accController.buildRegisterView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/register", {
    title: "Registration Form",
    nav,
    errors: null,
  })
};

/* ****************************************
 *  Account Management View (After someone has logged in.)
 * *************************************** */
accController.buildManagementView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
};

/* ****************************************
*  Process Registration
* *************************************** */
accController.registerNewAccount = async function (req, res, next) {
    let nav = await Util.getNavigation()
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

/* ****************************************
*  Process Login Request
* *************************************** */
accController.accountLogin = async function (req, res) {
  let nav = await Util.getNavigation()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
      if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account/")
      }
  } catch (error) {
      return new Error('Access Forbidden')
  }
}

module.exports = accController;