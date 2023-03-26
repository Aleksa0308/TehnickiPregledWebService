const { sequelize, Agency, Type, Specification } = require("../models");
const path = require("path");
const { Op, literal, JSON } = require("sequelize");
const { type } = require("os");

const getAgencyTotal = async (req, res) => {
  let datum = req.params.datum;
  datum = datum.split("&");
  let datum1 = datum[0].split("-");
  let datum1SQL = datum1[2] + "-" + datum1[1] + "-" + datum1[0];
  let datum2 = datum[1].split("-");
  let datum2SQL = datum2[2] + "-" + datum2[1] + "-" + datum2[0];
  let agencije = await Agency.findAll().catch((err) =>
    res.status(500).json(err)
  );
  let names = agencije.map((a) => a.dataValues.name);
  let numbers = [];
  for (let i = 0; i < names.length; i++) {
    numbers[i] = await Specification.count({
      where: {
        [Op.and]: [
          { agencija: names[i] },
          {
            datum: {
              [Op.gte]: datum1SQL,
            },
          },
          {
            datum: {
              [Op.lte]: datum2SQL,
            },
          },
        ],
      },
    }).catch((err) => res.status(500).json(err));
  }
  let config = {
    labels: names,
    datasets: [{ label: "Broj vozila", data: numbers }],
  };
  res.json({ config: config });
};

const getTotal = async (req, res) => {
  let datum = req.params.datum;
  datum = datum.split("&");
  let datum1 = datum[0].split("-");
  let datum1SQL = datum1[2] + "-" + datum1[1] + "-" + datum1[0];
  let datum2 = datum[1].split("-");
  let datum2SQL = datum2[2] + "-" + datum2[1] + "-" + datum2[0];

  let number = await Specification.count({
    where: {
      [Op.and]: [
        {
          datum: {
            [Op.gte]: datum1SQL,
          },
        },
        {
          datum: {
            [Op.lte]: datum2SQL,
          },
        },
      ],
    },
  }).catch((err) => res.status(500).json(err));

  res.json({ total: number });
};

const getTehnickiTotal = async (req, res) => {
  let datum = req.params.datum;
  datum = datum.split("&");
  let datum1 = datum[0].split("-");
  let datum1SQL = datum1[2] + "-" + datum1[1] + "-" + datum1[0];
  let datum2 = datum[1].split("-");
  let datum2SQL = datum2[2] + "-" + datum2[1] + "-" + datum2[0];

  let number = await Specification.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("tehnicki")), "totalTehnicki"],
    ],
    where: {
      [Op.and]: [
        {
          datum: {
            [Op.gte]: datum1SQL,
          },
        },
        {
          datum: {
            [Op.lte]: datum2SQL,
          },
        },
      ],
    },
    raw: true,
  }).catch((err) => res.status(500).json(err));

  res.json({ total: number[0].totalTehnicki });
};
const getPlacenoTotal = async (req, res) => {
  let datum = req.params.datum;
  datum = datum.split("&");
  let datum1 = datum[0].split("-");
  let datum1SQL = datum1[2] + "-" + datum1[1] + "-" + datum1[0];
  let datum2 = datum[1].split("-");
  let datum2SQL = datum2[2] + "-" + datum2[1] + "-" + datum2[0];

  let number = await Specification.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("placeno")), "totalPlaceno"],
    ],
    where: {
      [Op.and]: [
        {
          datum: {
            [Op.gte]: datum1SQL,
          },
        },
        {
          datum: {
            [Op.lte]: datum2SQL,
          },
        },
      ],
    },
    raw: true,
  }).catch((err) => res.status(500).json(err));

  res.json({ total: number[0].totalPlaceno });
};

const getCountAgenType = async (req, res) => {
  let datum = req.params.datum;
  datum = datum.split("&");
  let datum1 = datum[0].split("-");
  let datum1SQL = datum1[2] + "-" + datum1[1] + "-" + datum1[0];
  let datum2 = datum[1].split("-");
  let datum2SQL = datum2[2] + "-" + datum2[1] + "-" + datum2[0];

  const agencije = await Agency.findAll(
    { order: [["name", "ASC"]] },
    { raw: true }
  );
  const types = await Type.findAll(
    { order: [["price", "DESC"]] },
    { raw: true }
  );

  let niz = [];
  for (let i = 0; i < agencije.length; i++) {
    niz.push({ agencija: agencije[i].name, data: [] });
    for (let j = 0; j < types.length; j++) {
      let ans = await Specification.findAll({
        attributes: [
          "vrsta",
          [sequelize.fn("COUNT", sequelize.col("vrsta")), "total"],
          [sequelize.fn("sum", sequelize.col("tehnicki")), "totalTehnicki"],
          [sequelize.fn("sum", sequelize.col("placeno")), "totalPlaceno"],
        ],
        group: "vrsta",
        where: {
          [Op.and]: [
            {
              datum: {
                [Op.gte]: datum1SQL,
              },
            },
            {
              datum: {
                [Op.lte]: datum2SQL,
              },
            },
            {
              agencija: agencije[i].name,
            },
            {
              vrsta: types[j].name,
            },
          ],
        },
        raw: true,
      }).catch((err) => res.status(500).json(err));
      if (ans[0] === undefined) {
        ans[0] = {
          vrsta: types[j].name,
          total: 0,
          totalTehnicki: 0,
          totalPlaceno: 0,
        };
      }
      niz[i].data.push(ans[0]);
    }
    let sumUkupno = 0;
    let sumTehnicki = 0;
    let sumPlaceno = 0;
    niz[i].data.forEach((element) => {
      sumUkupno += element.total;
      sumTehnicki += parseInt(element.totalTehnicki)
      sumPlaceno += element.totalPlaceno;
    });
    niz[i].data.push({
      zbir: "Zbir",
      sumUkupno: sumUkupno,
      sumTehnicki: sumTehnicki,
      sumPlaceno: sumPlaceno,
    });
  }
  res.json({ data: niz });
};

module.exports = {
  getAgencyTotal,
  getTotal,
  getTehnickiTotal,
  getPlacenoTotal,
  getCountAgenType,
};
