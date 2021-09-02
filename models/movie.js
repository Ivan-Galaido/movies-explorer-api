const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: [true, 'Поле "country" обязательно для заполнения.'],
  },
  director: {
    type: String,
    require: [true, 'Поле "director" обязательно для заполнения.'],
  },
  duration: {
    type: Number,
    require: [true, 'Поле "duration" обязательно для заполнения.'],
  },
  year: {
    type: String,
    require: [true, 'Поле "year" обязательно для заполнения.'],
  },
  description: {
    type: String,
    require: [true, 'Поле "description" обязательно для заполнения.'],
  },
  image: {
    type: String,
    require: [true, 'Поле "image" обязательно для заполнения.'],
    validate: {
      validator: (v) => isUrl(v),
      message: 'Не верно указана ссылка',
    },
  },
  trailer: {
    type: String,
    require: [true, 'Поле "trailer" обязательно для заполнения.'],
    validate: {
      validator: (v) => isUrl(v),
      message: 'Не верно указана ссылка',
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'Поле "thumbnail" обязательно для заполнения.'],
    validate: {
      validator: (v) => isUrl(v),
      message: 'Не верно указана ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    require: [true, 'Поле "movieId" обязательно для заполнения.'],
  },
  nameRU: {
    type: String,
    require: [true, 'Поле "nameRU" обязательно для заполнения.'],
  },
  nameEN: {
    type: String,
    require: [true, 'Поле "nameEN" обязательно для заполнения.'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
