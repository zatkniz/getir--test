const express = require('express');
const router = express.Router();
const { transformRequest, createError } = require('../helpers/transformRequest');
const { findAll } = require('../models/records')

/* GET home page. */
router.post('/', async ({ body }, res, _) => {
  try {

    /*
    * Get All records with filters
    */
    const records = await findAll(body);
    res.json(transformRequest(0, 'Success', records));
  } catch (error) {
    console.log(error);
    res.status(500).json(createError(1, 'Error', error));
  }
});

module.exports = router;
