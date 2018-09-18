const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model(
  'movie',
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      required: true
    },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
    genre: {
      type: genreSchema,
      required: true
    }
  })
);

function movieValidation(movie) {
  const validationSchema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
    genreId: Joi.objectId().required()
  };
  return Joi.validate(movie, validationSchema);
}

module.exports = {
  Movie,
  movieValidation
};
