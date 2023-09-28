const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        EmailAddress: {
            type: String,
            required: true,
            unique: true,
        },
        BusinessName: {
            type: String,
            required: true,
            trim: true,
        },

        BusinessNumber: {
            type: String,
            required: true,
        },
        UniqueCode: {
            type: String,
            required: true,
        },
        ExternalReference: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        HomeAddress: {
            type: {},
            required: true,
        },
        PostalAddress: {
            type: {},
            required: true,
        },
        ArchiveDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;