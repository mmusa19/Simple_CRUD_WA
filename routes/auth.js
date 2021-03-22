const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const jwt = require("jsonwebtoken");

// *************************************** //

router.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username,password) VALUES (?,?);",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Not allowed!, we need a token!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: "You failed to authenticate!" });
      } else {
        next();
      }
    });
  }
};

router.get("/auth", verifyJWT, (req, res) => {
  res.send({ auth: true, message: "You are authenticated!" });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            });
            req.session.user = result;

            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({
              auth: false,
              message: "Wrong username/password combination!",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "No user exist!" });
      }
    }
  );
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({
      loggedIn: false,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ loggedIn: false, message: "Logged out!" });
});

module.exports = router;
