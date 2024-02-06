const utilities = require("../utilities/")
const errorController = {}

errorController.error = async function(req, res){
    throw new IntentionalError("This page is intentionally broken.")
}

class IntentionalError extends Error {
    constructor(message) {
        super(message)
        this.name = "Intentional Error"
    }
}

module.exports = errorController