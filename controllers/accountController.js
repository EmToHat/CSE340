const Util = require("../utilities/")
const accountModel = require("../models/account-model")

const accController = {} // creates an empty object in the accCont variable.

/* ****************************************
 *  Deliver login view
 * *************************************** */
accController.buildLogin = async (req, res, next) => {
  try {
    let nav = await Util.getNav()
    res.render("account/login", { // views/account/login
      title: "Login Form",
      nav,
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/* ****************************************
 *  Deliver registration view
 * *************************************** */
accController.buildRegister = async (req, res, next) => {
  try {
    let nav = await Util.getNav()
    res.render("account/register", {
      title: "Registration Form",
      nav,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


/* ****************************************
*  Process Registration
* *************************************** */
accController.registerAccount = async function (req, res, next) {
    let nav = await Util.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(account_password, 10);

    const regResult = await accountModel.registerAccount(
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
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
      })
    }
  }


module.exports = accController