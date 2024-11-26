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
    unique: true,
  },
  valor_condominio: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: true,
  },
  n_quartos: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  n_banheiros: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  n_vagas: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  tipo_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Tipo', 
      key: 'tipo_id',
    },
  },
  cidade_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Cidade', 
      key: 'cidade_id',
    },
  },
  estado_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Estado', 
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
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
}, {
  schema: 'public',
  tableName: 'imovel',
  timestamps: false,
});

module.exports = { Imovel };
