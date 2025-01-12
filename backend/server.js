const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize app and dotenv
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
console.log("JWT_SECRET:", process.env.JWT_SECRET);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/write", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);