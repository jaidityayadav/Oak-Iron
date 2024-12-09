const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    } catch (error) {
        console.error("Failed to connect to the DB", error);
    }
}

ConnectDB();

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", cartRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", userRoutes);

app.listen(3000, () => {
    console.log("listening at port 3000");
});
