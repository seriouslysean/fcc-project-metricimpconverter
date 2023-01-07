'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.get('/api/convert', (req, res) => {
    const { input } = req.query;
    const converter = new ConvertHandler(input);
    return res.send(converter.output());
  });

};
