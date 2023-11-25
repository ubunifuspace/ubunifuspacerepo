const express = require('express')
var bodyParser = require('body-parser')
const port = 5000
const cors = require('cors');
require('dotenv').config();
const app = express()
app.use(cors());
app.use(express.json());

// body parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Ubunifu space Backend ')
})

// LISTENING PORT ON
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})