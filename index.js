const connect = require('./dbConfig/connect');
connect();
const PORT = 4040 ; 
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
app.use(express.json());
const fs = require('fs');
const http= require('http');



const userRoutes = require('./routes/userRoutes');

app.use('/user' , userRoutes.router);

app.listen(PORT , ()=>{
    console.log(`Port is running on ${PORT}.`)
});