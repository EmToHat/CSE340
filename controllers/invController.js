const invModel = require('../models/inventory-model') // brings the inventory-model.js file into scope.
const Util = require('../utilities/') // brings the files from the utilities folder (i.e., the index.js file) into scope

const invCont = {} // creates an empty object in the invCont variable.


/* ***************************
 *  Classification View
 * ************************** */
invCont.buildByClassificationId = async (req, res, next) => {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);

    if (data && data.length > 0) {
      const className = data[0].classification_name;
      const grid = await Util.buildClassificationGrid(data);
      let nav = await Util.getNav();

      res.render('./inventory/classification', {
        title: className + ' vehicles',
        nav,
        grid,
      });
    } else {
      // Handle the case where data is empty (e.g., send a 404 response)
      res.status(404).send('No vehicles found for the given classification');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


/* ***************************
 *  Vehicle Detail View
 * ************************** */
invCont.showItemDetail = async (req, res) => {
  try {
    const vehicle_id = req.params.id;
    const data = await invModel.getVehicleById(vehicle_id);
    const grid = await Util.buildVehicleDetailGrid(data);
    
    let nav = await Util.getNav();

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


/* ***************************
 *  Management Tools View
 * ************************** */
invCont.buildManagementTools = async (req,res,next) => {
  let nav = await Util.getNav();
  let managementButtons = await Util.buildInventoryManagementButtons();
  res.render('./inventory/management', {
    title: 'Inventory Management Tools',
    nav,
    managementButtons,
    errors: null
  })
}


/* ***************************
 *  Classification Form View
 * ************************** */
invCont.buildClassificationView = async (req, res, next) => {
  let nav = await Util.getNav();
  res.render(
    './inventory/add-classification',
    {
      title: 'Register New Classification',
      nav,
      errors: null
    })
}


/* ***************************
 *  Inventory Form View
 * ************************** */
invCont.buildInventoryView = async (req, res, next) => {
  let nav = await Util.getNav();
  let classificationList = await Util.buildClassificationList();
  res.render(
    './inventory/add-inventory', 
    {
      title: 'Add New Inventory Item',
      nav,
      classificationList,
      errors: null
    })
}


/* ***************************
 *  Add Classification
 * ************************** */
invCont.addNewClassification = async (req, res, next) => {
  const { classification_name } = req.body
  const classNameResult = await invModel.insertNewClassification( classification_name );
  if (classNameResult) {
    let nav = await Util.getNav();
    req.flash(
      'notice',
      `Awesome! ${classification_name} has been added.`
    )
    res.status(201).render(
      './inventory/add-classification', 
      {
        title: 'Successfully added new classification',
        nav,
        errors: null
      })
  } else {
    let nav = await Util.getNav();
    req.flash(
      'notice', 
      `Sorry, ${classification_name} could not be added.`
    )
    res.status(501).render(
      './inventory/add-classification', 
      {
        title: 'Add New Classification',
        nav,
        errors: null
      });
  }
}

/* ***************************
 *  Add Inventory
 * ************************** */
invCont.addNewInventoryItem = async function (req, res, next) {
  let nav = await Util.getNav()
  let classificationList = await Util.buildClassificationList()
  let managementButtons = await Util.buildInventoryManagementButtons()
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  try {
    const inventoryData = await invModel.insertNewInventoryItem(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )
    if (inventoryData) {
      req.flash("notice", `You\'ve added another vehicle to the inventory`)
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        classificationList,
        managementButtons,
        errors: null,
      })
    } else {
      req.flash(
        "error",
        "There was an error. Check your information and try again."
      )
      res.status(501).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors: null,
      })
    }
  } catch (error) {
    req.flash("error", "Sorry, there was an error processing your request.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
    })
  }
}

module.exports = invCont;