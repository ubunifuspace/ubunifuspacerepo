const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 5000;
;

// import {userHistory} from 'react-router-dom'

app.use(cors());

app.use(bodyParser.json());


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ubunifu_space",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to Mysql database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


user_id = 1
title ="waste disposal"
description = "desc 1"
department ="env"

db.query(
    "INSERT INTO problem (user_id, title, description, department) VALUES (?, ?, ?, ? )",
    [
        user_id, title, description, department
    ],
    (insertError, insertResult) => {
      if (insertError) {
        console.error("Error when inserting student data", insertError);
        return res.status(500).json({
          error: true,
          message: "An error occurred during student registration.",
        });
      }else {
        console.log("Idea inserted successfully");
        // Send a response or perform any other actions here
      }
    }

  );
