require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');

let user = require('./controllers/usercontroller');
let pet = require('./controllers/petcontroller')
let fido = require('./controllers/fidocontroller')
let dogs = require('./controllers/dogs/dogfetches');
let cats = require('./controllers/cats/catfetches')


sequelize.sync();
app.use(require('./middleware/headers'))
app.use(express.json())

app.use('/dogs', dogs)
app.use('/cats', cats)
app.use('/user', user);
app.use('/pet', pet)
app.use('/fido', fido)




app.listen(3000, function() {
    console.log("App is listening on Port 3000");
})