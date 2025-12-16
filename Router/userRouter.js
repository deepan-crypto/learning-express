const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
    .route("/")
    .get(userController.getAllPlants)
    .post(userController.createPlant);

router
    .route("/:id")
    .get(userController.getPlantById)
    .put(userController.updatePlant);

module.exports = router;
