const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/caregiver");

const app = express();

dotenv.config()
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Registration endpoint
app.get("/", (_req, res) => {
  res.send("Welcome to Medicare restful APIs")
});

app.use("/auth/", router);


// .ENV VARIABLES
const port = process.env.PORT || 8000
const connectionString = process.env.CONNECTION_STRING;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
 

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });