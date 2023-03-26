const { sequelize, Brand } = require('../models')
const path = require('path')

const getAll = async (req, res) => {
    
    Brand.findAll()
        .then( rows => res.json(rows))
        .catch( err => res.status(500).json(err))
}

const addOne = async(req, res) => {
        
    let payload = {
        name: req.body.name, 
    }
    Brand.create(payload)
        .then( rows => res.json(rows))
        .catch( err => res.status(500).json(err))
}

const deleteOne = async (req, res) => {
    let id = req.params.id
    await Brand.destroy({ where: { id: id }} )
    res.status(200).send('Brand deleted!')
}

const updateOne = async (req, res) => {

    id = req.params.id
    newName =  req.body.name;

    const elem = await Brand.update({name: newName}, {where : {id: id}})
    res.status(200).send(elem);

};


module.exports = {
    getAll,
    addOne,
    deleteOne,
    updateOne
}