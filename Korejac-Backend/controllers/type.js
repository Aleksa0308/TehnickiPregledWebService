const { sequelize, Type, Specification } = require('../models')
const path = require('path')

const getAll = async (req, res) => {
    
    Type.findAll({order: [['price', 'DESC']]})
        .then( rows => res.json(rows))
        .catch( err => res.status(500).json(err))
}

const addOne = async(req, res) => {
        
    let payload = {
        name: req.body.name,
        price: req.body.price,  
    }
    Type.create(payload)
        .then( rows => res.json(rows))
        .catch( err => res.status(500).json(err))
}

const getOne = async (req, res) => {
    Type.findOne({where: { id: req.params.id}})
        .then( rows => res.json(rows))
        .catch( err => res.status(500).json(err))
}

const deleteOne = async (req, res) => {
    let id = req.params.id
    await Type.destroy({ where: { id: id }} )
    res.status(200).send('Type deleted!')
}

const updateOne = async (req, res) => {
  id = req.params.id;
  newName = req.body.name;
  newPrice = req.body.price;

  const rep = await Type.findOne({ where: { id: id } });
  oldName = rep.dataValues.name;

  const elem = await Type.update({ name: newName, price: newPrice }, { where: { id: id } });


  await Specification.update(
    { vrsta: newName },
    { where: { vrsta: oldName } }
  );


  res.status(200).send(elem);
};


module.exports = {
    getAll,
    addOne,
    getOne,
    deleteOne,
    updateOne
}