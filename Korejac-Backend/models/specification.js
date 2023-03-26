'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specification.init(
    {
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      agencija: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vrsta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marka: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tehnicki: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      placeno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      napomena: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datum: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Specification",
    }
  );
  return Specification;
};