const { sequelize, User } = require("../models");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  User.findAll()
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const addOne = async (req, res) => {
  let payload = {
    name: req.body.name,
    password: req.body.password,
  };
  User.create(payload)
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const getOne = async (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
};

const deleteOne = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).send("User deleted!");
};

const login = async (req, res) => {
  console.log(req.body);
  User.findOne({ where: { username: req.body.username } })
    .then((usr) => {
      if (bcrypt.compareSync(req.body.password, usr.password)) {
        const obj = {
          userId: usr.id,
          user: usr.username,
          role: usr.role,
        };

        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

const register = async (req, res) => {
  const obj = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  };

  User.create(obj)
    .then((rows) => {
      const usr = {
        userId: rows.id,
        user: rows.username,
        role: rows.role,
      };

      res.json({ msg: "Success!" });
    })
    .catch((err) => res.status(500).json(err));
};

const updateOne = async (req, res) => {
  id = req.params.id;
  newUsername = req.body.username;
  newPassword = req.body.password;
  newRole = req.body.role;
  if (newPassword === "") {
    const elem = await User.update(
      { username: newUsername, role: newRole },
      { where: { id: id } }
    );
    res.status(200).send(elem);
  } else {
    newPassword = bcrypt.hashSync(req.body.password, 10)
    const elem = await User.update(
      { username: newUsername, password: newPassword, role: newRole },
      { where: { id: id } }
    );
    res.status(200).send(elem);
  }
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  login,
  register,
  updateOne
};
