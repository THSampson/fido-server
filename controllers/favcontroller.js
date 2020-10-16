const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const Fav = require('../db').import('../models/favorites');
const validateSession = require('../middleware/sessionToken');
global.Headers = fetch.Headers;

//View all favorites

router.get('/', validateSession, (req, res) => {
        Fav.findAll(
        {where: 
            {userId: id.params.id}
            }
    )

.then((fav) => res.status(200).json(fav))
.catch(err => res.status(500).json({error:err}))
})

//Add new favorite

router.post('/new', validateSession, (req, res) => {
const newFav = {
    name: req.body.name,
    type: req.body.type,
    comment: req.body.comment,
    userId: req.user.id
    }
Fav.create(newFav)
.then((fav) => res.status(200).json({message: 'New Friend Added to Favorites!', fav}))
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
        req.body, 
        {where: 
        {id: req.params.id}
        })
        .then(() => res.status(200).json({message: "Favorite Updated."}))
        .catch(err => res.status(500).json({error:err}))

})


module.exports = router;