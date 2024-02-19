// Assignment 6

// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const mainController = require("../controllers/maintenanceController") // Brings the invController into scope.

const Util = require('../utilities')
const handleErrors = require('../utilities')

//const mainValidation = require('../utilities/maintenance-validation');

//const classValidation = require('../utilities/new-class-validation');
//const invValidation = require('../utilities/new-inv-validation');

/* ***************************
 *  GET
 * ************************** */
// Route to get all reports
router.get("/reports/", mainController.buildViewGetAllReports);

// Route to get report by maintenance_history_id
router.get("/reports/:maintenance_history_id", mainController.buildViewGetSingleReportById);

// Route to get maintenance reports
router.get('/getInventoryReports/:maintenance_history_id', Util.handleErrors(mainController.getInventoryReportsJSON));

// Route to add a report 
router.get(
    "/add-report",
    Util.handleErrors(mainController.buildViewAddReportForm)
);

// Route to edit report by maintenance_history_id
router.get(
    "/edit-report/:maintenance_history_id",
    Util.handleErrors(mainController.buildViewEditReportByIdForm)
);

// Route to delete report by maintenance_history_id
router.get(
    "/delete-report/:maintenance_history_id",
    Util.handleErrors(mainController.buildViewDeleteReportByIdForm)
);


/* ***************************
 *  POST
 * ************************** */

// Process the new report data
router.post(
    "/add-report",
    mainValidation.addingSingleReportRules(),
    mainValidation.checkAddReport,
    Util.handleErrors(mainController.processAddReport)
)

// Process the updated report data
router.post(
    "/edit-report",
    mainValidation.addingSingleReportRules(),
    mainValidation.checkUpdatedReport,
    Util.handleErrors(mainController.processEditReport)
)

// Process the deleted report data
router.post(
    "/delete-report",
    Util.handleErrors(mainController.processDeleteReport)
)

module.exports = router; // exports the router objects to be used elsewhere in the project.