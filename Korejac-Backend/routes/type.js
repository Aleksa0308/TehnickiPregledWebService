const express = require('express')
const router = express.Router()


const {
 getAll,
 addOne,
 getOne,
 deleteOne,
 updateOne
} = require('../controllers/type.js')

const { authAdmin, authToken } = require("../middleware/authenticate");

router.route('/').get(authToken, getAll);
router.route('/:id').get(authToken ,getOne);
router.route('/').post(authAdmin ,addOne);
router.route('/:id').delete(authAdmin ,deleteOne);
router.route("/:id").put(authAdmin, updateOne);


module.exports = router