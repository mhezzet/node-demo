const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
  'customer',
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      required: true
    },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 }
  })
);

function customerValidation(customer) {
  const validationSchema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(customer, validationSchema);
}

module.exports = {
  Customer,
  customerValidation
};
