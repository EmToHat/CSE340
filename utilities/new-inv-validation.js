const Util = require(".")
const {body, validationResult} = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  New Inv Data Validation Rules
 * ********************************* */
validate.addingVehicleRules = () => {
    return [
        body("inv_make")
            .trim()
            .matches(/[A-Za-z0-9]/)
            .withMessage("Invalid format. Numbers and letters only."),

        body("inv_model")
            .trim()
            .matches(/[A-Za-z0-9 .-]/)
            .withMessage("Invalid format. Numbers and letters only."),

        body("inv_year")
            .trim()
            .matches(/[0-9]/)
            .isLength(4)
            .withMessage("Enter a valid 4 digit year"),

        body("inv_description")
            .trim()
            .matches(/[A-Za-z0-9 .,!$?]/)
            .withMessage("Please remove special characters from the description. We're trying to avoid catastrophe."),

        body("inv_image")
            .trim()
            .isIn(["no-image.png"])
            .withMessage("Unavailable.")
            .custom( async (inv_image) => {
                console.log(inv_image);
                let regex = new RegExp('(\/).(\\w+).(\\w+).*(\.)(gif|png|jpg|jpeg)', 'g');
                /*
                let matched = regex.test(inv_image);
                console.log(matched);
                if (!matched) {
                    throw new Error("Please supply image path in proper format");
                }*/
            }),

        body("inv_thumbnail")
            .trim()
            .isIn(["no-image-tn.png"])
            .withMessage("Unavailable.")
            .custom( async (inv_thumbnail) => {
                console.log(inv_thumbnail);
                /*let regex = new RegExp('(\/).(\\w+).(\\w+).*(\.)(gif|png|jpg|jpeg)', 'g');
                let matched = regex.test(inv_thumbnail);
                console.log(matched);
                if (!matched) {
                    throw new Error("Please supply thumbnail path in proper format");
                }*/
            }),

        body("inv_price")
            .trim()
            .matches(/[0-9]/)
            .isLength({min: 3, max: 9})
            .withMessage("Invalid format. Must be a valid number (increments of 100)."),

        body("inv_miles")
            .trim()
            .matches(/[0-9]/)
            .withMessage("Invalid format. Must be a valid number."),

        body("inv_color")
            .trim()
            .matches(/[A-Za-z]/)
            .isLength({min: 3, max: 20})
            .withMessage("The name of that color looks a little odd. Enter a recognized color."),

        body("classification_id")
        .custom(async (classification_id) => {
            const classExists = await invModel.checkExistingClassById(classification_id)
            if (!classExists){
                throw new Error("Something went wrong. Invalid Classification.")
            }
        })
    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkVehicleData = async (req,res,next) => {
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
        classification_id
    } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await Util.getNav()
        let classificationList = await Util.buildClassificationList(classification_id)
        res.render("inventory/add-inventory", {
            title: "Add New Classification",
            errors,
            nav,
            classificationList,
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
        })
        return
    }
    next()
}


module.exports = validate;