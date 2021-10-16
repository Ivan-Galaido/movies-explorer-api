const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundErr = require('../errors/not-found-err');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createdMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId() },
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user._id,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      populate: ['owner'],
    },
  )
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOneAndDelete({
    _id: req.params.movieId,
    owner: req.user._id,
  }).populate('owner')
    .orFail(() => {
      throw new NotFoundErr('Нет фильма с таким id');
    })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports = {
  getUserMovies,
  createdMovie,
  deleteMovie,
};
