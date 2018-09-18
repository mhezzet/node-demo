const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model(
  'rental',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
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
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          minlength: 3,
          maxlength: 50,
          trim: true,
          lowercase: true,
          required: true
        },
        dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturn: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function rentalValidation(rental) {
  const validationSchema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, validationSchema);
}

module.exports = {
  Rental,
  rentalValidation
};
