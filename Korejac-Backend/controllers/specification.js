const { sequelize, Specification } = require("../models");
const path = require("path");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  Specification.findAll()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const getOne = async (req, res) => {
  datum = req.params.datum;
  datum = datum.split("-");
  datum = datum[2] + "-" + datum[1] + "-" + datum[0];
  Specification.findAll({ where: { datum: datum } })
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const getCount = async (req, res) => {
  datum = req.params.datum;

  Specification.count()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const getPrevious = async (req, res) => {
  datum = req.params.datum;
  const number = await Specification.findAll({
    where: {
      datum: {
        [Op.lt]: datum,
      },
    },
  }).catch((err) => res.status(500).json(err));
  if(number.length === 0){
    res.json({ prev: 0});
  }else{
  let x = number.length;
  res.json({ prev: number[x - 1].num });
  }
};

const addAll = async (req, res) => {
  data = req.body.data;
  datum = req.params.datum;

  if (data.length === 0) {
    const duzina = await Specification.findAll({ where: { datum: datum } });

    if (duzina.length === 0) {
      await Specification.destroy({ where: { datum: datum } });
      res.status(400);
      res.send("Empty");
      return;
    } else {
      await Specification.destroy({ where: { datum: datum } });
      await Specification.update(
        {
          num: sequelize.literal(`num - ${duzina.length}`),
        },
        {
          where: {
            datum: {
              [Op.gt]: datum,
            },
          },
        }
      );

      res.status(400);
      res.send("Empty");
      return;
    }
  }
  //Get Num of Next Entry
  nextSpecNum = await Specification.findOne({
    where: {
      datum: {
        [Op.gt]: datum,
      },
    },
  });

  //Ako ne postoji veci datum -> znaci da se upisuje za danasnji datum!
  if (nextSpecNum) {
    nextSpecNum = nextSpecNum.dataValues.num;
  } else {
    //Ne postoji veci datum znaci da upisujemo za danasnji ->
    //Obrisi postojece
    await Specification.destroy({ where: { datum: datum } });
    //Dodaj prosledjene
    await Specification.bulkCreate(data);

    res.status(200);
    res.send("Success");
    return;
  }

  //Get Index of last element that has to be added
  last = data.length - 1;
  console.log("NextSpecNum:", nextSpecNum);
  //Ako u izmeni dodajem VECI broj elementa
  if (nextSpecNum - 1 < data[last].num) {
    //Moramo povecati num svim sledeci elementima
    //dec -> za koliko moramo da povecamo num
    inc = data[last].num - nextSpecNum + 1;

    //Uvecaj sve manje elemente za inc gde je datum veci od prosledjenog
    await Specification.update(
      {
        num: sequelize.literal(`num + ${inc}`),
      },
      {
        where: {
          datum: {
            [Op.gt]: datum,
          },
        },
      }
    );
    //Obrisi postojece
    await Specification.destroy({ where: { datum: datum } });
    //Dodaj prosledjene
    await Specification.bulkCreate(data);

    res.status(200);
    res.send("Success");
    return;
  }
  //Ako u izmeni dodaj ISTI broj elementa
  if (nextSpecNum - 1 === data[last].num) {
    //Obrisi postojece
    await Specification.destroy({ where: { datum: datum } });
    //Dodaj prosledjene
    await Specification.bulkCreate(data);

    res.status(200);
    res.send("Success");
    return;
  }
  //Ako u izmeni dodajem MANJI broj elementa
  if (nextSpecNum - 1 > data[last].num) {
    //Moramo smanjiti num svim sledeci elementima
    //dec -> za koliko moramo da smanjimo num
    dec = nextSpecNum - 1 - data[last].num;
    //Umanji sve vece elemente za dec
    await Specification.update(
      {
        num: sequelize.literal(`num - ${dec}`),
      },
      {
        where: {
          num: {
            [Op.gt]: data[last].num,
          },
        },
      }
    );
    //Obrisi postojece
    await Specification.destroy({ where: { datum: datum } });
    //Dodaj prosledjene
    await Specification.bulkCreate(data);

    res.status(200);
    res.send("Success");
    return;
  }
};

const getFirstDate = async (req, res) => {
  const first = await Specification.findOne({ where: { num: 1 } }).catch(
    (err) => res.status(500).json(err)
  );
  value = first.dataValues.datum;
  res.json({ datum: value });
};

module.exports = {
  getAll,
  getOne,
  getCount,
  addAll,
  getFirstDate,
  getPrevious,
};
