const express = require("express");
const { registerController, updateProfileController, getUserDetailController, deleteUserProfileController } = require("../contollers/registerController");

//router object
const router = express.Router();

// create profile
router.post("/create", registerController);

//update profile
router.put("/update", updateProfileController);

// getting profile
router.get("/get", getUserDetailController);

//delete profile
router.delete("/delete", deleteUserProfileController);

module.exports = router;
