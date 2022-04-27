const con = require('../db-config');
const queries = require('../queries/orderdetails.queries');

exports.getAllOrderDetails = function(req, res) {
    con.query(queries.ALL_ODERDETAILS, function(err, result, fields) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  };

// http://localhost:3000/orderdetails/1
exports.getOrderDetails = function(req, res) {
    con.query(queries.SINGLE_ODERDETAILS, [req.params.orderNumber], function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  };

// http://localhost:3000/orderdetails/1
exports.createOrderDetails = function(req, res) {
  con.query(queries.INSERT_ODERDETAILS, [req.body.customerName], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

// http://localhost:3000/orderdetails/1
exports.updateOrderDetails = function(req, res) {
  con.query(
    queries.UPDATE_ODERDETAILS,
    [req.body.customerName, req.body.comments, req.params.orderNumber],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:3000/orderdetails/1
exports.deleteOrderDetails = function(req, res) {
  con.query(queries.DELETE_ODERDETAILS, [req.params.orderNumber], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};