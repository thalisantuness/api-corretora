const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Tipo = sequelize.define('Tipo', {
  tipo_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  }
 
}, {
  schema: 'public',
  tableName: 'tipo',
  timestamps: false,
});

module.exports = { Tipo };
