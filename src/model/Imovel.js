const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Estado } = require('./Estado')
const { Tipo } = require('./Tipo')
// const { Photo } = require('./Photo')

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
      model: Tipo, 
      key: 'tipo_id',
    },
  },
  estado_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Estado, 
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

Imovel.belongsTo(Estado, {
  foreignKey: 'estado_id',
  as: 'estado', 
});

Imovel.belongsTo(Tipo, {
  foreignKey: 'tipo_id',
  as: 'tipo', 
});

// Imovel.hasMany(Photo, {
//   foreignKey: 'imovel_id',
//   as: 'photo',
// });

module.exports = { Imovel };
