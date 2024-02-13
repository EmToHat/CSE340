const pool = require("../database/");

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const insertQuery = 
        `INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) 
        VALUES ($1, $2, $3, $4, 'Client') RETURNING *`;
      const data = await pool.query(insertQuery, [account_firstname, account_lastname, account_email, account_password]);

      return data;
    } catch (error) {
      return error.message
    }
  }

  /* *****************************
*   Check for existing email
* *************************** */
async function checkExistingEmail(account_email) {
  try {
    const selectQuery = `SELECT * FROM account WHERE account_email = $1`
    const data = await pool.query(selectQuery, [account_email])
    return data.rowCount
  } catch (error) {
    return error.message
  }
}
  module.exports = {registerAccount, checkExistingEmail};