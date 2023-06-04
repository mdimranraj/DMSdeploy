require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
import path from "path";

const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

// server configurations.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on port: ${PORT}`);
});
