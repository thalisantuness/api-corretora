const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Cidade = sequelize.define('Cidade', {
  cidade_id: {
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
  tableName: 'cidade',
  timestamps: false,
});

module.exports = { Cidade };
