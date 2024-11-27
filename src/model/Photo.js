// const { Sequelize } = require('sequelize');
// const sequelize = require('../utils/db');
// const { Imovel } = require('./Imovel')

// const Photo = sequelize.define('Photo', {
//   photo_id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   imovel_id: { 
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: Imovel, 
//       key: 'imovel_id',
//     },
//   },
//   data_cadastro: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//   },
//   data_update: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//   },
//   imageData: { 
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// }, {
//   schema: 'public',
//   tableName: 'photo',
//   timestamps: false,
// });

// module.exports = { Photo };
