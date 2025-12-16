const fs = require("fs");

const jsonData = JSON.parse(
    fs.readFileSync("./plant.json", "utf-8")
);

// GET ALL
exports.getAllPlants = (req, res) => {
    res.status(200).json({
        status: "Success",
        length: jsonData.length,
        data: {
            jsonData,
        },
    });
};

// GET BY ID
exports.getPlantById = (req, res) => {
    const id = req.params.id * 1;
    const plant = jsonData.find(el => el.id === id);

    res.status(200).json({
        status: "Success",
        data: {
            plant,
        },
    });
};

// POST
exports.createPlant = (req, res) => {
    const id = jsonData.length;
    const plant = Object.assign(req.body);

    jsonData.push(plant);

    fs.writeFileSync(
        "./plant.json",
        JSON.stringify(jsonData),
        "utf-8"
    );

    res.status(201).json({
        status: "Successful",
        data: {
            plant,
        },
    });
};

exports.updatePlant = (req, res) => {
    const resId = req.params.id;
    const plant = jsonData.find(el => el.id == resId);

    if (!plant) {
        return res.status(404).json({
            status: "Fail",
            message: "Please check your entry id",
        });
    }

    res.status(204).json({
        status: "Successful",
        message: "<> Update Successful <>",
    });
};


