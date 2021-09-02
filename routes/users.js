const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validations');

const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validateUserUpdate, updateUserInfo);

module.exports = router;
