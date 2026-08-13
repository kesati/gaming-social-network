const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const userProfleRoutes = require("./routes/userProfileRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", userProfleRoutes);

app.get('/', (req, res) => {
    res.send("Gaming Social Network API is running");
});


module.exports = app;