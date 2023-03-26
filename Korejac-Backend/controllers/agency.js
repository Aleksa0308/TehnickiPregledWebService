const { sequelize, Agency, Specification } = require("../models");
const path = require("path");

const getAll = async (req, res) => {
  Agency.findAll({ order: [["name", "ASC"]] })
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const addOne = async (req, res) => {
  let payload = {
    name: req.body.name,
  };
  Agency.create(payload)
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const deleteOne = async (req, res) => {
  let id = req.params.id;
  await Agency.destroy({ where: { id: id } });
  res.status(200).send("Agency deleted!");
};

const updateOne = async (req, res) => {
  id = req.params.id;
  newName = req.body.name;

  const rep = await Agency.findOne({ where: { id: id } });
  oldName = rep.dataValues.name;
  const elem = await Agency.update({ name: newName }, { where: { id: id } });

  await Specification.update({agencija: newName}, {where: {agencija: oldName}})
  res.status(200).send(elem);
};

module.exports = {
  getAll,
  addOne,
  deleteOne,
  updateOne,
};
