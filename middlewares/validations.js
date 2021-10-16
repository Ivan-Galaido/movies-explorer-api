const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const isURL = require('validator/lib/isURL');

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }).unknown(true),
});

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "name" обязательно для заполнения.',
        'string.min': 'Минимальная длинная поля "name" - 2',
        'string.max': 'Максимальная длинная поля "name" - 30',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле "password" обязательно для заполнения.',
        'string.min': 'Минимальная длинная поля "password" - 8',
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле "email" обязательно для заполнения.',
        'string.email': 'Не верно указан адрес "email".',
      }),
  }).unknown(true),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинная поля "name" - 2',
        'string.max': 'Максимальная длинная поля "name" - 30',
      }),
    email: Joi.string().email()
      .messages({
        'string.email': 'Не верно указан адрес "email".',
      }),
  }).unknown(true),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "country" обязательно для заполнения.',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "director" обязательно для заполнения.',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" обязательно для заполнения.',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "year" обязательно для заполнения.',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "description" обязательно для заполнения.',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть заполнено url-адресом.');
    })
      .messages({
        'any.required': 'Поле "image" обязательно для заполнения.',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть заполнено url-адресом.');
    })
      .messages({
        'any.required': 'Поле "trailer" обязательно для заполнения.',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть заполнено url-адресом.');
    })
      .messages({
        'any.required': 'Поле "thumbnail" обязательно для заполнения.',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле "movieId" обязательно для заполнения.',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameRU" обязательно для заполнения.',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameEN" обязательно для заполнения.',
      }),
  }).unknown(true),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле "email" обязательно для заполнения.',
        'string.email': 'Не верно указан адрес "email".',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле "password" обязательно для заполнения.',
        'string.min': 'Минимальная длинная поля "password" - 8',
      }),
  }).unknown(true),
});

module.exports = {
  validateMovieId,
  validateUserCreate,
  validateUserUpdate,
  validateMovieBody,
  validateAuthentication,
};
