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
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
         JOIN public.classification AS c 
         ON i.classification_id = c.classification_id 
         WHERE i.classification_id = $1`,
        [classification_id]
      );
  
      return data.rows;
    } catch (err) {
      console.error(`Get Inventory By Classification Id Function Error: ${err.message}`);
      throw err;
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

/* ***************************
 *  Select classification by id 
 * ************************** */

async function checkExistingClassById(classification_id) {
  try {
    const selectQuery = `SELECT * FROM public.classification WHERE classification_id = $1`;
    
    const data = await pool.query(selectQuery, [classification_id]);

    // Check if any rows were returned
    return data.rows.length > 0;
  } catch (error) {
    console.error('checkExistingCatById error:', error);
    throw error;
  }
}


/* ***************************
 *  Insert a new classification
 * ************************** */
async function insertNewClassification(classification_name) {
  try {
    const insertQuery = `INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *`;
    
    const data = await pool.query(insertQuery, [classification_name]);
    
    console.log("Inserted classification data:", data.rows);

    return data.rows;
  } catch (err) {
    console.error("insertNewClassification error:", err);
    throw err;
  }
}

/* ***************************
 *  Check if a new classification already exists
 * ************************** */
async function checkExistingClass(classificationName) {
  const selectQuery = 
    `
    SELECT * FROM public.classification 
    WHERE classification_name = $1
    `;
  const data = await pool.query(selectQuery, [classificationName]);
  return data.rows.length > 0; // Returns true if the classification already exists
}

/* ***************************
 *  Insert a new inventory item
 * ************************** */
async function insertNewInventoryItem(inventoryItemData) {
  try {
    const insertQuery = `
    INSERT INTO public.inventory (
      inv_make, inv_model, inv_year,
      inv_description, inv_image, inv_thumbnail,
      inv_price, inv_miles, inv_color, classification_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const insertValues = [
      inventoryItemData.inv_make,
      inventoryItemData.inv_model,
      inventoryItemData.inv_year,
      inventoryItemData.inv_description,
      inventoryItemData.inv_image,
      inventoryItemData.inv_thumbnail,
      inventoryItemData.inv_price,
      inventoryItemData.inv_miles,
      inventoryItemData.inv_color,
      inventoryItemData.classification_name,
    ];

    const data = await pool.query(insertQuery, insertValues);

    return data;
  } catch (err) {
    console.error("insertNewInventoryItem error:", err);
    throw err;
  }
}



module.exports = {getClassifications, getInventoryByClassificationId, getVehicleById, insertNewClassification, insertNewInventoryItem, checkExistingClass, checkExistingClassById};