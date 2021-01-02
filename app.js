const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quickfix",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected...");
});

app.get("/getadds", (req, res) => {
  let sqlSelect = "SELECT * FROM adds WHERE archive='N'";
  db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.listen("3001", () => {
  console.log("Server started, port 3001");
});
