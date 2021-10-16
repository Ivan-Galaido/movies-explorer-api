const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://movies-ex.nomoredomains.club',
  'http://movies-ex.nomoredomains.club',
];

module.exports = {
  limiter,
  allowedCors,
};
