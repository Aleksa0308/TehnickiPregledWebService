const express = require('express')
const router = express.Router()


const {
 getAll,
 addOne,
 getOne,
 deleteOne,
 login,
 register,
 updateOne
} = require('../controllers/user.js')
const { authAdmin, authToken } = require("../middleware/authenticate");

router.route('/login').post(login);
router.route('/register').post(authAdmin ,register);
router.route('/').get(authAdmin ,getAll);
router.route('/:id').get(authAdmin ,getOne);
router.route('/:id').delete(authAdmin ,deleteOne);
router.route("/:id").put(authAdmin, updateOne);


module.exports = router