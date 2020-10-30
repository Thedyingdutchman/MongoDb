// Import mongoose here - done
// Create schemea (Title, Budget, Color)
// Create insert endpoint 
// Update the fetch endpoint to fethc data from Mdb instead of json file
// Update insert endpoint to add data to mongodb

let url = 'mongodb://localhost:27017/mongo_demo';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const nameModel = require("./info_schema");

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', express.static('public'));

var fs = require('fs');

let rawdata = fs.readFileSync('budget-data.json');
let myBudget = JSON.parse(rawdata);
console.log(myBudget);

app.get('/hello' , (req, res) => {
    res.send('Hello World ');
});

// fetches the data
app.get('/budget' , (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log("Connected to the database")
            // List ALl entries
            // This function is going to the models and info_schema.js and returning all the data
            nameModel.find({})
                    .then((data)=> {
                        console.log(data)
                        res.send(data)
                        mongoose.connection.close()
                    })
                    .catch((connectionError)=>{
                        console.log(connectionError)
                        res.send("Fetch data Error")
                    })
            
        .catch((connectionError) => {
            console.log(connectionError)
            res.send("Database Connection Err")
        })

    })
});

app.post('/budget' , (req, res) => {
    console.log(req.body)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log("Connected to the database")
            let newData = new nameModel({Title: req.body.Title, Budget: req.body.Budget, Color: req.body.Color});
            nameModel.insertMany(newData)
                    .then((data)=> {
                        console.log(data)
                        res.send(data)
                        mongoose.connection.close()
                    })
                    .catch((connectionError)=>{
                        console.log(connectionError)
                        res.send("Error")
                    })
        })
        .catch((connectionError) => {
            console.log(connectionError)
            res.send("Connection Error")
        })
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});