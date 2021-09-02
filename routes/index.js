const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundErr = require('../errors/not-found-err');
const { validateAuthentication, validateUserCreate } = require('../middlewares/validations');

router.all('/', auth);
router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateAuthentication, login);
router.get('/signout', logout);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.all('/*', () => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

module.exports = router;
