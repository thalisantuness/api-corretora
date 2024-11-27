const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Estado } = require('./Estado')

const Cidade = sequelize.define('Cidade', {
  cidade_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Estado, 
      key: 'estado_id',
    },
  },
 
}, {
  schema: 'public',
  tableName: 'cidade',
  timestamps: false,
});

Cidade.belongsTo(Estado, {
  foreignKey: 'estado_id',
  as: 'estado', 
});

module.exports = { Cidade };
