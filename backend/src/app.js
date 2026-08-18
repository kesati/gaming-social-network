const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/profile", require("./routes/userProfileRoutes.js"));
app.use("/api/game", require("./routes/gameRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));
app.use("/api/posts/:postId", require("./routes/reactionRoutes.js"));
app.use("/api/post/:postId/comments", require("./routes/commentRoutes.js"));
app.use("/api/room", require("./routes/roomRoutes.js"));



app.get('/', (req, res) => {
    res.send("Gaming Social Network API is running");
});


module.exports = app;