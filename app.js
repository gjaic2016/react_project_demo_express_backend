const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());

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

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const country = req.body.country;

  db.query(
    "INSERT INTO users (firstname, lastname, email, username, password, country) VALUES (?,?,?,?,?,?)",
    [firstname, lastname, email, username, password, country],
    (err, result) => {
      console.log("Updated user..." + result);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Pogrešna lozinka/korisničko ime" });
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server started, port 3001");
});

//log
