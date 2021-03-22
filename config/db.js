const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDataBase",
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = db;
