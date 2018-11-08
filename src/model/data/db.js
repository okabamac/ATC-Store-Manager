//Import config params

import config from '../../../secrets/db_config';

// Loading and initializing the library:
const pgp = require('pg-promise')({
  // Initialization Options
});

// Preparing the connection details:
const cn = config;

// Creating a new database instance from the connection details:
const client = pgp(cn);

client.query('CREATE TABLE IF NOT EXISTS products(id NUMERIC not null, category VARCHAR(40) not null,  name VARCHAR(40) not null,  quantity SERIAL not null, price SERIAL not null, size REAL not null, image_url VARCHAR(20000))', (err, done) => {
  done();
});
client.query('CREATE TABLE IF NOT EXISTS orders(id NUMERIC not null, attendant VARCHAR(40) not null, category VARCHAR(40) not null,  product VARCHAR(40) not null,  quantity SERIAL not null, price SERIAL not null)', (err, done) => {
  done();
});
client.query('CREATE TABLE IF NOT EXISTS users(username VARCHAR(50) not null,  password VARCHAR(1000) not null)', (err, done) => {
  done();
});
client.query('CREATE TABLE IF NOT EXISTS admins(username VARCHAR(50) not null,  password VARCHAR(1000) not null)', (err, done) => {
  done();
});

// Exporting the database object for shared use:
module.exports = client;