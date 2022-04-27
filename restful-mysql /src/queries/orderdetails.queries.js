exports.CREATE_ORDERDETAILS_TABLE = `CREATE TABLE IF NOT EXISTS orderdetails(
  orderNumber int NOT NULL AUTO_INCREMENT,
  customerName varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending',
  comments varchar(255) DEFAULT NULL,
  PRIMARY KEY (orderNumber)
)`;

exports.ALL_ODERDETAILS = `SELECT * FROM orderdetails`;

exports.SINGLE_ODERDETAILS = `SELECT * FROM orderdetails WHERE orderNumber = ?`;

exports.INSERT_ODERDETAILS = `INSERT INTO orderdetails (customerName) VALUES (?)`;

exports.UPDATE_ODERDETAILS = `UPDATE orderdetails SET customerName = ?, comments = ? WHERE orderNumber = ?`;

exports.DELETE_ODERDETAILS = `DELETE FROM orderdetails WHERE orderNumber = ?`;