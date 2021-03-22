const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/get", (req, res) => {
  const sqlSelect = "SELECT * FROM match_reviews;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

router.post("/insert", (req, res) => {
  const matchName = req.body.matchName;
  const matchReview = req.body.matchReview;

  const sqlInsert =
    "INSERT INTO match_reviews (matchName, matchReview) VALUES (?, ?);";
  db.query(sqlInsert, [matchName, matchReview], (err, result) => {});
});

router.delete("/delete/:matchName", (req, res) => {
  const matchName = req.params.matchName;

  const sqlDelete = "DELETE FROM match_reviews WHERE matchName=?;";
  db.query(sqlDelete, matchName, (err, result) => {
    if (err) console.log(err);
  });
});

router.put("/update", (req, res) => {
  const name = req.body.matchName;
  const review = req.body.matchReview;

  const sqlUpdate =
    "UPDATE match_reviews SET matchReview = ? WHERE matchName = ?;";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

module.exports = router;
