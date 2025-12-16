const express = require("express");
const PlantController = require("../Controller/PlantController");

const router = express.Router();

router
    .route("/")
    .get(PlantController.getAllPlants)
    .post(PlantController.createPlant);

router
    .route("/:id")
    .get(PlantController.getPlantById)
    .put(PlantController.updatePlant);

module.exports = router;
