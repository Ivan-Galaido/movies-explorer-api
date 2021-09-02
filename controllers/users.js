const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');
const ConflictingRequest = require('../errors/conflicting-request');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new ConflictingRequest('Пользователь с таким E-mail уже существует.');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((data) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: data._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ email: data.email, name: data.name });
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send(user);
    })
    .catch(next);
};
const logout = (req, res) => {
  res.clearCookie('jwt').send({ success: true });
};
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundErr('Нет пользователя с таким id'); })
    .then((data) => { res.send(data); })
    .catch(next);
};
const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((foundData) => {
      if (foundData && foundData._id.toString() !== req.user._id.toString()) {
        throw new ConflictingRequest('Пользователь с таким E-mail уже существует.');
      }
      return User.findById(req.user._id)
        .then((oldData) => User.findByIdAndUpdate(
          req.user._id,
          {
            name: name || oldData.name,
            email: email || oldData.email,
          },
          {
            new: true,
            runValidators: true,
          },
        )
          .orFail(() => { throw new NotFoundErr('Нет пользователя с таким id'); })
          .then((data) => { res.send(data); }));
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  logout,
  getUser,
  updateUserInfo,
};
