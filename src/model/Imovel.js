const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Imovel = sequelize.define('Imovel', {
  imovel_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,  
  },
  valor_condominio: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  n_quartos: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  n_banheiros: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  n_vagas: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tipo_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tipo', 
      key: 'tipo_id',
    },
  },
  cidade_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'cidade', 
      key: 'cidade_id',
    },
  },
  estado_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'estado', 
      key: 'estado_id',
    },
  },
  data_cadastro: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  data_update: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  imageData: { 
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  schema: 'public',
  tableName: 'imovel',
  timestamps: false,
});

module.exports = { Imovel };
