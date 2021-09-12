const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundErr = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');

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
  .orFail()
  .then((movie) => {
    if (String(movie.owner) === req.user._id) {
      return movie;
    }
    return next(new Forbidden('Нельзя удалять чужие фильмы'));
  })
  .then((movie) => movie.remove().then((movieRemoved) => res.send(movieRemoved)))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundErr') {
      next(new NotFoundErr(`Фильм с указанным ${req.params.movieId} не найден`));
    } else {
      next(err);
    }
  });
};

module.exports = {
  getUserMovies,
  createdMovie,
  deleteMovie,
};
