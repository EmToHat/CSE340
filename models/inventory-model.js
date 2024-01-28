// All Data interactions are stored in the model of the M-V-C appraoch.
// This file will have functions that interact with the tables `classification` and `inventory`

const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */

  //declares an asynchronous function by name and passes a variable, which should contain the classification_id value, as a parameter.
async function getInventoryByClassificationId(classification_id) {

  // opens a try - catch block.
  try {

    //creates an SQL query to read the inventory and classification information 
    // from their respective tables using an INNER JOIN. 
    // The query is written using a prepared statement. 
    // The "$1" is a placeholder, which will be replaced by the value shown in the brackets "[]" 
    // when the SQL statement is run. 
    // The SQL is queried against the database via the database pool. 
    // Note the await keyword, which means this query will wait for the 
    // information to be returned, where it will be stored in the data variable.
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )

    // sends the data, as an array of all the rows, back to where the function was called (in the controller).
    return data.rows

    // ends the try and opens the catch, with an error variable being supplied to store any error that may occur.
  } catch (err) {

    // writes the error, if any, to the console for us to read. We will have to deal with a better error handler in the future.
    console.err(`Get Classifications By Id Function Error ${err}`)
  }
}

/* ***************************
 *  Get vehicle by inventory ID
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    console.log(data.rows)
    return data.rows
  }
  catch (err) {
    console.error(`Get Vehicle By Id Function Error ${err}`)
  }
}



module.exports = {getClassifications, getInventoryByClassificationId, getVehicleById};