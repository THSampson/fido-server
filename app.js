require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db');

app.use(cors());

let user = require('./controllers/usercontroller');
let profile = require('./controllers/profilecontroller');
let animals = require('./controllers/shelterfetches');
let favorites = require('./controllers/favcontroller');



sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/animals', animals);
app.use('/user', user);
app.use('/profile', profile);
app.use('/favorites', favorites);



app.listen(process.env.PORT, function() {
    console.log(`App is listening on Port ${process.env.PORT}`);
})