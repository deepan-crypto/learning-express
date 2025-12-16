const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllPlants);

    
    
router.route("/").post(userController.createPlant);

router.route("/:id").get(userController.getPlantById);
    
router.route("/:id").put(userController.updatePlant);

module.exports = router;
