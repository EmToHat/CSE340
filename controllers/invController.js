const invModel = require("../models/inventory-model") // brings the inventory-model.js file into scope.
const utilities = require("../utilities/") // brings the files from the utilities folder (i.e., the index.js file) into scope

const invCont = {} // creates an empty object in the invCont variable.

/* ***************************
 *  Build inventory by classification view
 * ************************** */
    // creates an asynchronous anonymous function accepting the objects request and response, and the Express next function as params.
    // The function is stored in the name buildByClassificationId
invCont.buildByClassificationId = async function (req, res, next) {
    
    // collects the classification_id that has been sent as a named parameter through the URL and stored in the classification_id variable.
    // req is the request object, which the client sends to the server.
    // params is an Express function, used to represent data that is passed in the URL from the client to the the server.
    // classificationId is the name that was given to the classification_id value in the inventoryRoute.js file.
  const classification_id = req.params.classificationId
    
    // calls the getInventoryByClassificationId function from the inventory-model file, and passes the classification_id as a parameter.
    // this function "awaits" the data to be retuned, and the data is then stored in the data variable.
  const data = await invModel.getInventoryByClassificationId(classification_id)
    
    // calls a utility function to build a grid that contains all the vehicles according to classification.
  const grid = await utilities.buildClassificationGrid(data)
    
    // calls the function to build the nav bar for use in the view and stores it in the nav variable.
  let nav = await utilities.getNav()

    // extracts the name of the classification, which matches the classification_id, from the data returned from the database and stores it in the className variable.
  const className = data[0].classification_name

    // calls the Express render function to return a view to the browser.
    // the view that will be returned is named classification which comes from the inventory folder in the views folder.
  res.render("./inventory/classification", {

    // build the "title" to be used in the head partial.
    title: className + " vehicles",

    // this nav variable displays the navigation bar to the view.
    nav,

    // the variable contains the HTML string of the inventory items.
    grid,
  })
}


/* ***************************
 *  Build vehicle detail view
 * ************************** */

invCont.showItemDetail = async (req, res) => {
  try {
    const vehicle_id = req.params.id;
    const data = await invModel.getVehicleById(vehicle_id);
    const grid = await utilities.buildVehicleDetailGrid(data);
    let nav = await utilities.getNav();

    if (data.length > 0) {
      const vehicleTitle = `${data[0].inv_make} ${data[0].inv_model}`;
      res.render('./inventory/detail', { 
        title: vehicleTitle, 
        nav, 
        grid, 
      });
    } else {
      // Handle the case where data is empty (e.g., send a 404 response)
      res.status(404).send('Vehicle not found');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = invCont