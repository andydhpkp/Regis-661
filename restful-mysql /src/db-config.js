const mysql = require('mysql');
const queries = require('./queries/orderdetails.queries');
const authQueries = require('./queries/auth.queries');

const host = process.env.DB_HOST || 'localhost';

const user = process.env.DB_USER || 'root';

const password = process.env.DB_PASS || 'Ngjngjngj2';

const database = process.env.DB_DATABASE || 'ordersdb';

// Create the connection with required details
const con = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  // Connect to the database.
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');

    con.query(authQueries.CREATE_USERS_TABLE, function(err, result) {
      if (err) throw err;
      console.log('Users table created or exists already!');
    });
  
    con.query(queries.CREATE_ORDERDETAILS_TABLE, function(err, result) {
      if (err) throw err;
      console.log('Orderdetails table created or exists already!');
    });
  });
  
  module.exports = con;