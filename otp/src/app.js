const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credential: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRoute = require("./routes/userRoute.js");

// localhost:5000/Api/V1/User/create
app.use("/api", userRoute);

module.exports = { app };
