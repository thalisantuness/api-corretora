const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Estado = sequelize.define('Estado', {
  estado_id: {
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
  tableName: 'estado',
  timestamps: false,
});

module.exports = { Estado };
