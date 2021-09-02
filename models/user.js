const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Поле "name" обязательно для заполнения.'],
    minLength: [2, 'Минимальная длинная поля "name" - 2'],
    maxLength: [30, 'Максимальная длинная поля "name" - 30'],
  },
  email: {
    type: String,
    require: [true, 'Поле "email" обязательно для заполнения.'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Не верно указан адрес.',
    },
  },
  password: {
    type: String,
    require: [true, 'Поле "password" обязательно для заполнения.'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
          };
        });
    });
};

module.exports = mongoose.model('user', userSchema);
