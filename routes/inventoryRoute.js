// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const invController = require("../controllers/invController") // Brings the invController into scope.
const Util = require('../utilities/')
const handleErrors = require('../utilities')
const classValidation = require('../utilities/new-class-validation');
const invValidation = require('../utilities/new-inv-validation');

// Route to get inventory by classification view
    // "get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
    // "/type/:classificationId" is the route being watched for. 
    // "invController.buildByClassificationId" indicates that the buildByClassification function within the invController will be used to fulfill the request sent by the route.
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to get inventory item detail view
router.get('/detail/:id', invController.showItemDetail);

// Route to get the management view
router.get('/management', invController.buildManagementTools);

// Router to get the add-classification view
router.get("/add-classification", invController.buildClassificationView);

// Router to get the add-inventory view
router.get("/add-inventory", invController.buildInventoryView)

// Process the new Classification data
router.post(
    "/add-classification",
    classValidation.addingClassRules(),
    classValidation.checkClassData,
    Util.handleErrors(invController.addNewClassification)
)

// Process the new inventory data
router.post(
    "/add-inventory",
    invValidation.addingVehicleRules(),
    invValidation.checkVehicleData,
    Util.handleErrors(invController.addNewInventoryItem)
)


module.exports = router; // exports the router objects to be used elsewhere in the project.