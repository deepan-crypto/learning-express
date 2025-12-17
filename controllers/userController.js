const Plant=require("./../Models/plantModels");


const fs = require("fs");

// const jsonData = JSON.parse(
//     fs.readFileSync("./plant.json", "utf-8")
// );

// // GET ALL
// exports.getAllPlants = (req, res) => {
//     res.status(200).json({
//         status: "Success",
//         length: jsonData.length,
//         data: {
//             jsonData,
//         },
//     });
// };

// // GET BY ID
// exports.getPlantById = (req, res) => {
//     const id = req.params.id * 1;
//     const plant = jsonData.find(el => el.id === id);

//     res.status(200).json({
//         status: "Success",
//         data: {
//             plant,
//         },
//     });
// };

// // POST
// exports.createPlant = (req, res) => {
//     const id = jsonData.length;
//     const plant = Object.assign(req.body);

//     jsonData.push(plant);

//     fs.writeFileSync(
//         "./plant.json",
//         JSON.stringify(jsonData),
//         "utf-8"
//     );

//     res.status(201).json({
//         status: "Successful",
//         data: {
//             plant,
//         },
//     });
// };

// exports.updatePlant = (req, res) => {
//     const resId = req.params.id;
//     const plant = jsonData.find(el => el.id == resId);

//     if (!plant) {
//         return res.status(404).json({
//             status: "Fail",
//             message: "Please check your entry id",
//         });
//     }

//     res.status(204).json({
//         status: "Successful",
//         message: "<> Update Successful <>",
//     });
// };


const Plant = require("../Model/plantModel");

// GET ALL PLANTS
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();

    res.status(200).json({
      status: "success",
      length: plants.length,
      data: plants,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// CREATE NEW PLANT
exports.createPlant = async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);

    res.status(201).json({
      status: "success",
      data: newPlant,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SINGLE PLANT BY ID
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        status: "fail",
        message: "Plant not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: plant,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPlant) {
      return res.status(404).json({
        status: "fail",
        message: "Plant not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedPlant,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
