const express = require("express");
const { registerController, updateProfileController } = require("../contollers/registerController");

//router object
const router = express.Router();

// create profile
router.post("/create", registerController);

//update profile
router.put("/update", updateProfileController)

// getting profile
router.get("/get", updateProfileController)

//delete profile
router.delete("/delete", updateProfileController)

module.exports = router;