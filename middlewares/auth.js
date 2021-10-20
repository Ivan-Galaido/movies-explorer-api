const { JWT_SECRET = DEV_JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const DEV_JWT_SECRET = 'dev-secret';

 const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;

  return next();
};

export default auth;
