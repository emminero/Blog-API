const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const { PORT, MONGODB_URI } = process.env;
const uri = MONGODB_URI;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );
