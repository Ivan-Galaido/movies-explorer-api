const router = require('express').Router();
const { validateMovieId, validateMovieBody } = require('../middlewares/validations');

const {
  getUserMovies,
  createdMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', validateMovieBody, createdMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
