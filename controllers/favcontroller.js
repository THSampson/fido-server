const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const Fav = require('../db').import('../models/favorites');
const validateSession = require('../middleware/sessionToken');
global.Headers = fetch.Headers;

//View all favorites

router.get('/', validateSession, (req, res) => {
    let userID = req.user.id
    Fav.findAll({
        where: {ownerID: userID},
    })

.then(() => res.status(200).json())
.catch(err => res.status(500).json({error:err}))
})

//Add new favorite

router.post('/new', (req, res) => {
const newFav = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    description: req.body.describe, 
    img: req.body.img,
    url: req.body.url,
    comment: '',
    
}
Fav.create(newFav)
.then(() => res.status(200).json({message: 'New Friend Added to Favorites!'}))
.catch(err => res.status(500).json({error:err}))
})

//Delete favorite
router.delete('/:id', validateSession, (req, res) => {
    Fav.destroy(
        {where: {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Favorite Deleted"}))
    .catch(err => res.status(500).json({error: err}))
})

//Update comment on favorite

router.put('/:id', validateSession, (req, res) => {
    Fav.update(
        req.body.comment, 
        {where: 
        {id: req.params.id}
        })
        .then(() => res.status(200).json({message: "Favorite Updated."}))
        .catch(err => res.status(500).json({error:err}))

})


module.exports = router;