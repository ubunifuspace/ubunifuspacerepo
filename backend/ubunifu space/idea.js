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

problem_id = 1
description = "safety dustbin"
user_id = 1

db.query(
    "INSERT INTO idea (problem_id, user_id, description) VALUES (?, ?, ?)",
    [
      problem_id,
      user_id,
      description,
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


// const ideaIdToUpdate = 1;  // Replace 1 with the specific idea id you want to update
// const newDescription = 'new_description';  // Replace 'new_description' with the updated description

// db.query(
//   "UPDATE idea SET description = ? WHERE id = ?",
//   [newDescription, ideaIdToUpdate],
//   (updateError, updateResult) => {
//     if (updateError) {
//       console.error("Error when updating idea data", updateError);
//       // Handle the error and send an appropriate response if needed
//     } else {
//       console.log("Idea updated successfully");
//       // Send a response or perform any other actions here
//     }
//   }
// );
