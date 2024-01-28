// This file will hold functions that are "utility" in nature, meaning that we will reuse them over and over, but they don't directly belong to the M-V-C structure.

const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul class='navigation__list'>"
    list += '<li><a href="/" title="Home page" class="navigation__list--item">Home</a></li>'
    data.rows.forEach((row) => {
    list += "<li>"
    list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles" class="navigation__list--item">' +
        row.classification_name +
        "</a>"
    list += "</li>"
    })
    list += "</ul>"
    return list
    }


/* **************************************
* Build the classification view HTML
* ************************************ */
    // declares the function as asynchronous and expects a data array as a parameter.
Util.buildClassificationGrid = async function(data){

    // declares a variable to hold a string.
    let grid

    // an "if" to see if the array is not empty.
    if(data.length > 0){
      grid = '<ul id="inv-display__ul">'

      // sets up a "forEach" loop, to break each element of the data array into a vehicle object.
      data.forEach(vehicle => { 
        grid += '<li>' // Start of li
          grid+= '<div class="vehicle-grid-card__container inv-display__image-info-container">' // start of vehicle grid div
            
            grid += '<div class ="vehicle-grid-card__image inv-display__image-container">' // start of vehicle grid image div
              grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
              + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model
              + ' details" class="inv-display__image"><img src="' + vehicle.inv_thumbnail 
              +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
              +' on CSE Motors" /></a>'
            grid += '</div>'; // End of vehicle grid image div
          
            grid += '<div class="vehicle-grid-card__text namePrice">' // start of namePrice div
              grid += '<hr />'

              grid += '<h2>'
                grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
              grid += '</h2>'

              grid += '<span>$' 
              + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'  // End of vehicle grid text div

          grid += '</div>' // End of vehicle grid container div

        grid += '</li>'// End of li
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }

    // returns the variable to the calling location.
    return grid
  }


/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */

Util.buildVehicleDetailGrid = async function(data) {
  let grid = '';

  if (data.length > 0) {
    data.forEach(vehicle => {
      grid += '<div class="vehicle-detail-card__container">'; // Start of container div

        grid += `<div class="vehicle-detail-card__title"><h1>${vehicle.inv_make} ${vehicle.inv_model}</h1></div>`; // title div

        grid += `<div class="vehicle-detail-card__content">` // Start of vehicle detail content div

          grid += `<div class="vehicle-detail-card__image">` // Start of vehicle detail image div
            grid += `<img src=" ${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">`;
          grid += '</div>'; // End of vehicle detail image div

          grid += `<div class="vehicle-detail-card__text">` // Start of vehicle detail text div
            grid += `<p>Year: ${vehicle.inv_year}</p>`;
            grid += `<p>Price: ${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>`;
            grid += `<p>Mileage: ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>`;
          grid += `</div>`; // End of vehicle detail text div

        grid += `</div>`; // End of vehicle detail content div
    
      grid += '</div>'; // End of vehicle detail container div
    });
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }

  return grid;
};


  /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util