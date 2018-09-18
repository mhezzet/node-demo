const express = require('express');
const router = express.Router();
const { Movie, movieValidation } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
  const movie = await Movie.find();
  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('no genre with given ID');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = movieValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });
  await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = movieValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name
      }
    },
    { new: true }
  );

  if (!movie) return res.status(404).send('no genre with given ID');

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('no genre with given ID');
  res.send(movie);
});

module.exports = router;
