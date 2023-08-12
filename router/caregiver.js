const express = require("express");
const createCaregiver = require("../controller/caregiver");
const router = express.Router()
router.post("/createCaregiver", createCaregiver);
module.exports=router;