const userModel = require("../models/userModels");


//create a user
const registerController = async (req, res) => {
    try {
        const { EmailAddress, BusinessName, BusinessNumber, UniqueCode, ExternalReference, PhoneNumber, HomeAddress, PostalAddress, ArchiveDate } = req.body;
        //validations

        if (!EmailAddress) {
            return res.send({ message: "Email is Required" });
        }
        if (!BusinessName) {
            return res.send({ error: "BusinessName is Required" });
        }
        if (!BusinessNumber) {
            return res.send({ message: "BusinessNumber is Required" });
        }
        if (!UniqueCode) {
            return res.send({ message: "UniqueCode no is Required" });
        }
        if (!ExternalReference) {
            return res.send({ message: "ExternalReference is Required" });
        }
        if (!PhoneNumber) {
            return res.send({ message: "PhoneNumber is Required" });
        }
        if (!HomeAddress) {
            return res.send({ message: "HomeAddress is Required" });
        }
        if (!PostalAddress) {
            return res.send({ message: "PostalAddress is Required" });
        }
        if (!ArchiveDate) {
            return res.send({ message: "ArchiveDate is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ EmailAddress });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register",
            });
        }

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User Register Successfully",
            newUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};


// update profile
const updateProfileController = async (req, res) => {
    try {
        const { EmailAddress, BusinessName, BusinessNumber, UniqueCode, ExternalReference, PhoneNumber, HomeAddress, PostalAddress, ArchiveDate } = req.body;
        const user = await userModel.findById(req.user._id);

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                BusinessName: BusinessName || user.BusinessName,
                BusinessNumber: BusinessNumber || user.BusinessNumber,
                UniqueCode: UniqueCode || user.UniqueCode,
                ExternalReference: ExternalReference || user.ExternalReference,
                PhoneNumber: PhoneNumber || user.PhoneNumber,
                HomeAddress: HomeAddress || user.HomeAddress,
                PostalAddress: PostalAddress || user.PostalAddress,
                ArchiveDate: ArchiveDate || user.ArchiveDate,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};


// getting profile

const getUserDetailController = async (req, res) => {
    try {
        const { EmailAddress } = req.params;

        // Check if EmailAddress is provided
        if (!EmailAddress) {
            return res.status(400).json({ message: "Email Address is required" });
        }

        // Find the user by EmailAddress
        const user = await userModel.findOne({ EmailAddress });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in getting user details", error });
    }
};



//delete profile
const deleteUserProfileController = async (req, res) => {
    try {
        const { EmailAddress } = req.params;

        // Check if EmailAddress is provided
        if (!EmailAddress) {
            return res.status(400).json({ message: "Email Address is required" });
        }

        // Find the user by EmailAddress and delete it
        const deletedUser = await userModel.findOneAndDelete({ EmailAddress });

        // Check if the user exists and was deleted
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User profile deleted successfully", user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in deleting user profile", error });
    }
};


module.exports = { registerController, updateProfileController, getUserDetailController, deleteUserProfileController };