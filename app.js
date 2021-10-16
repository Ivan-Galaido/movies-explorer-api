require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter, corsOptions } = require('./config');
const routes = require('./routes');
const errorHeandler = require('./middlewares/error-heandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use (function (req, res, next) {
  res.header ("Access-Control-Allow-Origin", "ВАШ-ДОМЕН.TLD"); // обновляем в соответствии с доменом, из которого вы будете делать запрос
  res.header ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  следующий();
});

app.get ('/', function (req, res, next) {
  // Обрабатываем получение для этого маршрута
});

app.post ('/', function (req, res, next) {
 // Обрабатываем пост для этого маршрута
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
