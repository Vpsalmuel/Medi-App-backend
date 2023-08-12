const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    required: "First name is required",
  },
  lastName: {
    type: String,
    minlength: 3,
    required: "Last name is required",
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required",
  },
  phoneNumber: {
    type: String,
    required: "Phone number is required",
  },
  password: {
      type: String,
    minlength: 8,
      required: "password required"
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: String,
    default: new Date().toJSON,
  },
  otp: {
    type: Number,
    minlength: 4
   
  }
});
const Caregiver = mongoose.model("caregiver", usersSchema);
module.exports = Caregiver;
