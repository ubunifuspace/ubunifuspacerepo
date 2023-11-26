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


// // code foer users signup   API

  staff_id = 123
  name = "john"
  email ="john@gmail.com"
  password =123
  department= "ict"
  role_id=1



  db.query(
      "INSERT INTO users (staff_id, name, email, password,department, role_id) VALUES( ?, ?, ?,? ,?,?)",
      [   staff_id,
          name,
          email,
          password,
          department,
          role_id],
      (error, results) => {
        if (error) {
          console.error("Error inserting student to users:", error);
          return res.status(500).json({
            error: true,
            message: "Error inserting student",
          });
        }

      }
    );


// code for users signin
email ="john@gmail.com"
password = "123"

 
db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.error("error in checking the user", error);
        return res.status(500).json({
          error: true,
          message: "error occur on server side during checking the user",
        });
      }
      if (results.length === 0) {
        // User not found
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      const user = results[0];

        console.log(user.role_id)
        // call api to call all the problems and ideas according to the role

      
    }
  );


// db.query("SELECT * FROM users", (error, results) => {
//     if (error) {
//       return res.status(500).json({
//         error: true,
//         message: "Error has occurred when fetching data from the institution",
//       });
//     }

//     if (!results || results.length === 0) {
//       return res.status(404).json({
//         error: true,
//         message: "No data found in the moderators table",
//       });
//     }

//     console.log(results[0]);
//     res.status(200).json(results); // Adjust this response as needed
//   });