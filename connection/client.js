
const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);

module.exports = client;
