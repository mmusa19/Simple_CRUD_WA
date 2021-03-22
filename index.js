const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// *************************************** //
const app = express();

const PORT = 3001;

// *** routes *** //
const auth = require("./routes/auth");
const matchReviews = require("./routes/matchReview");
// *** routes *** //

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM match_reviews;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// init routes
app.use("/", auth);
app.use("/api", matchReviews);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
