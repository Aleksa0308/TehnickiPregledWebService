const express = require("express");
const router = express.Router();

const { getAll, getOne, getCount, addAll, getFirstDate, getPrevious} = require("../controllers/specification.js");
const { authAdmin, authToken } = require("../middleware/authenticate")

router.route("/").get(authToken, getAll);
router.route("/total").get(authToken ,getCount);
router.route("/first").get(authToken ,getFirstDate);
router.route("/previous/:datum").get(authToken ,getPrevious);
router.route("/:datum").get( authToken,getOne);
router.route("/:datum").post(authToken, addAll);
router.route("/:id").delete();

module.exports = router;
