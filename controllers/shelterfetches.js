const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
global.Headers = fetch.Headers;

const key = "hAfvRltAWWVsv1pPrOe5pWIr0RQkhEE4Zv5itgDES82WjWNAAO";
const secret = "ub15uklTB78jt76EhFOqV4g37BO8jzsQ28eVkhs6";

let Data;

//Fetch OAuth token
fetch("https://api.petfinder.com/v2/oauth2/token", {
  method: "POST",
  body:
    "grant_type=client_credentials&client_id=" +
    key +
    "&client_secret=" +
    secret,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
  .then((res) => res.json())
  .then((data) => {
    Data = data;
    console.log(Data);
  })
  .catch((err) => console.log(err));

//Fetch Shelter Animals
router.post("/", (req, res) => {
  const location = req.body.location;
  const type = req.body.type;
  // const gender = req.params.gender;
  // const age = req.params.age;
  // const goodWithCats = req.params.goodWithCats;
  // const goodWithChildren = req.params.goodWithChildren;
  // const goodWithDogs = req.params.goodWithDogs;
  // let url = `https://api.petfinder.com/v2/animals?type=dog`;
  let url = `https://api.petfinder.com/v2/animals?type=${type}`;
  let locationURL = `&location=${location}&distance=30`;
  // let locationURL = `&location=46038&distance=30`;
  // const searchTerms = `&gender=male&age=young&good_with_children=true&good_with_cats=true&good_with_dogs=true`;
  // const searchTerms = `&gender=${gender}=&age=${age}&good_with_children=${goodWithChildren}&good_with_cats=${goodWithCats}&good_with_dogs=${goodWithDogs}`;
  fetch(url + locationURL, {
    // + searchTerms, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Data.access_token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // intake = data
      // console.log(intake);
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
  // let list = intake.animals;
  // res.send(list);
});

module.exports = router;
