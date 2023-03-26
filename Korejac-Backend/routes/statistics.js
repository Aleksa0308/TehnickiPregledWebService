const express = require("express");
const router = express.Router();

const {
  getAgencyTotal,
  getTotal,
  getTehnickiTotal,
  getPlacenoTotal,
  getCountAgenType,
} = require("../controllers/statistics.js");

const { authAdmin, authToken } = require("../middleware/authenticate");

router.route("/agencije/:datum").get(authAdmin ,getAgencyTotal);
router.route("/tehnicki/:datum").get(authAdmin ,getTehnickiTotal);
router.route("/placeno/:datum").get(authAdmin, getPlacenoTotal);
router.route("/total/:datum").get(authAdmin, getTotal);
router.route("/grupisano/:datum").get( getCountAgenType);


module.exports = router;
