const Joi = require("joi");
const bcrypt = require("bcrypt")
const Caregivers = require("../models/caregiver");
const { sendVerificationMail } = require("../utils/sendVerificationMail");
const createCaregiver = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().min(8),
  });
  

  //Registering A User
  // Checking if a user with an existing email is already registered
  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message,
      data: null,
    });

  const { firstName, lastName, email, phoneNumber, password } = req.body;
  try {
    let caregiver = await Caregivers.findOne({ email });
    if (caregiver)
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "email already exists",
        data: null,
      });
      
      
      
    caregiver = new Caregivers({
      firstName,
      lastName,
      phoneNumber,
      password,
      email,
      otp: Math.floor(Math.random() * 1000) + 1000,
      isVerified: false,
      dateCreated: new Date().toJSON(),
    });
    const salt = await bcrypt.genSalt(10);
    caregiver.password = await bcrypt.hash(caregiver?.password, salt);
    await caregiver.save();
    sendVerificationMail(caregiver)
    res.status(201).send({
      responseCode: "00",
      responseMessage: "Created successfully!",
      data: caregiver,
    });
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};
module.exports = createCaregiver;
