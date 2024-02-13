const pool = require("../database/");

/* *****************************
*   Register new account
* *************************** */
async function insertNewAccount(account_firstname, account_lastname, account_email, account_password){
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

/* *****************************
*   Check for existing email
* *************************** */
async function getAccountByEmail (account_email) {
  try {
    const selectQuery = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return selectQuery.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

module.exports = {insertNewAccount, checkExistingEmail, getAccountByEmail};