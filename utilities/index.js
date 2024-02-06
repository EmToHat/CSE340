// This file will hold functions that are "utility" in nature, meaning that we will reuse them over and over, but they don't directly belong to the M-V-C structure.

const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    // Block: navigation
    let data = await invModel.getClassifications()
    let list = "<ul class='navigation__list'>"
    list += '<li><a href="/" title="Home page" class="navigation__list--item">Home</a></li>'
    // Element within Block: navigation__list
    data.rows.forEach((row) => {
        list += "<li>"
        // Element within Block: navigation__list--item
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

    // Block: vehicle-grid
let grid;

// an "if" to see if the array is not empty.
if(data.length > 0){
    // Element within Block: vehicle-grid__ul-style
    grid = '<ul class="vehicle-grid__ul">';

    // sets up a "forEach" loop, to break each element of the data array into a vehicle object.
    data.forEach(vehicle => {
        // Element within Block: vehicle-grid__li
        grid += '<li class="vehicle-grid__item">'; // Start of li
        grid += '<div class="vehicle-grid-card grid-cards">'; // start of vehicle grid div inv-display__image-info-container

        // Element within Block: vehicle-grid-card__image-container
        grid += '<div class="vehicle-grid-card__image-container">'; // start of vehicle grid image-container div
        grid += '<a href="../../inv/detail/' + vehicle.inv_id
            + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
            + ' details" class="vehicle-grid-card__image-link"><img src="' + vehicle.inv_thumbnail
            +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
            +' on CSE Motors" class="vehicle-grid-card__image"/></a>';
        grid += '</div>'; // End of vehicle grid image-container div

        // Element within Block: vehicle-grid-card__text
        grid += '<div class="vehicle-grid-card__text">'; // start of namePrice div
        grid += '<h1 class="vehicle-grid-card__title">';
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
            + vehicle.inv_make + ' ' + vehicle.inv_model + ' details" class="vehicle-grid-card__link">' + vehicle.inv_make + ' ' + vehicle.inv_model + ' </a>';
        grid += '</h1>';

        grid += '<span class="vehicle-grid-card__price">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
        grid += '</div>'; // End of vehicle grid text div

        grid += '</div>'; // End of vehicle grid container div

        grid += '</li>';// End of li
    });
    grid += '</ul>';
} else {
    // Element within Block: vehicle-grid__li
    grid += '<li class="vehicle-grid__item">';
    // Element within Block: notice
    grid += '<p class="vehicle-grid__notice">Sorry, no matching vehicles could be found.</p>';
    grid += '</li>';
}

// returns the variable to the calling location.
return grid;
};

/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleDetailGrid = async function(data) {
    let grid = '';

    if (data.length > 0) {
        data.forEach(vehicle => {
            // Block: vehicle-detail-card
            grid += '<div class="vehicle-detail-card__container">'; // Start of container div

            // Element within Block: vehicle-detail-card__title
            //grid += `<div class="vehicle-detail-card__title"><h1>${vehicle.inv_make} ${vehicle.inv_model}</h1></div>`; // title div

            // Element within Block: vehicle-detail-card__content
            grid += `<div class="vehicle-detail-card__content">` // Start of vehicle detail content div

            // Element within Block: vehicle-detail-card__image
            grid += `<div class="vehicle-detail-card__image-container">` // Start of vehicle detail image div
            grid += `<img src=" ${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-detail-card__image">`;
            grid += '</div>'; // End of vehicle detail image div

            // Element within Block: vehicle-detail-card__text
            grid += `<div class="vehicle-detail-card__text">` // Start of vehicle detail text div
            grid += `<p>Year: ${vehicle.inv_year}</p>`;
            grid += `<p>Price: $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>`;
            grid += `<p>Mileage: ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>`;
            grid += `</div>`; // End of vehicle detail text div

            grid += `</div>`; // End of vehicle detail content div

            grid += '</div>'; // End of vehicle detail container div
        });
    } else {
        // Element within Block: notice
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
