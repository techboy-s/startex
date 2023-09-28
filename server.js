const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);


//rest api

//port
const PORT = process.env.PORT || 8080;

//run listen

app.listen(PORT, () => {

    console.log(`server running on ${PORT}`);
});
