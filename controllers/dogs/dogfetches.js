const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const Wish = require('../../db').import('../../models/sheltersaves');
global.Headers = fetch.Headers;

const key = "hAfvRltAWWVsv1pPrOe5pWIr0RQkhEE4Zv5itgDES82WjWNAAO";
const secret = 'ub15uklTB78jt76EhFOqV4g37BO8jzsQ28eVkhs6';
const url = 'https://api.petfinder.com/v2/animals?type=dog';

let Data;
let Animals;

   fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key 
        + '&client_secret=' + secret,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
   }) 
    .then(res => res.json())
    .then((data) => {
        Data = data;
        console.log(Data);   
})
    .catch(err => console.log(err))


router.post('/', (req, res) => {
fetch(url, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    // 'body': JSON.stringify(animals[0]),
    'Authorization': `Bearer ${Data.access_token}`
   }
})
.then(res => res.json())
.then((intake) => {
    Animals = intake;
    // console.log('animals', Animals)
})
.catch(err => console.log(err))
const wishlist = {
    name: Animals.animals[0].name,
    age: Animals.age,
    gender: Animals.gender,
    description: Animals.description,
    image: Animals.photos[1]
    } 
Wish.create(wishlist)
.then((dog) => res.status(200).json(dog))
.catch(err => res.status(500).json({error: err}))
})





router.get('/', (req, res) => {
fetch(url, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Data.access_token}`
   }
})
.then(res => res.json())
.then((data)=> console.log('animals', data))
.catch(err => console.log(err))
})





// .then((dog) => res.status(200).json(dog))
// .catch(err => res.status(500).json({error:err}))
module.exports = router;