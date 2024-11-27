const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('cliente', 'admin'),
    allowNull: false,
    defaultValue: 'cliente',
  },
  pontos: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  data_cadastro: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  data_update: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  schema: 'public',
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = { Usuario };
