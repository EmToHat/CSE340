// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const invController = require("../controllers/invController") // Brings the invController into scope.

// Route to build inventory by classification view
    // "get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
    // "/type/:classificationId" is the route being watched for. 
    // "invController.buildByClassificationId" indicates that the buildByClassification function within the invController will be used to fulfill the request sent by the route.
router.get("/type/:classificationId", invController.buildByClassificationId);




// Route to build inventory item detail view
router.get('/detail/:id', invController.showItemDetail);


module.exports = router; // exports the router objects to be used elsewhere in the project.