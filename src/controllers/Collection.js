const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Products, Collection } = require('../db.js');

const season = [
  { id_collection: 1, name: 'Spring'},
  { id_collection: 2, name: 'Summer'},
  { id_collection: 3, name: 'Autunm'},
  { id_collection: 4, name: 'Winter'}
];

const collection = {
  addCollection: async (req, res) => {
    try {
      let temporada = Collection.bulkCreate(season);
      res.status(200).json({msg: 'Colecciones carga con éxito!!'});
    }
    catch (error) {
      console.log(error);
      res.redirect(404, '../');
    }
  },

}

module.exports = collection;
