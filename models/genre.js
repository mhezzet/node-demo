const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    lowercase: true,
    required: true
  }
});

const Genre = mongoose.model('genre', genreSchema);

function genreValidation(genre) {
  const validationSchema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(genre, validationSchema);
}

module.exports = {
  Genre,
  genreValidation,
  genreSchema
};
