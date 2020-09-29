const express = require('express')
const router = express.Router();
const Pet = require('../db').import('../models/petprofile');


router.post('/create', (req, res) => {
    const petFromRequest = {
      name:req.body.name,
      type: req.body.type,
      age: req.body.age,
      breed: req.body.breed,
    //   ownerID: req.user.id
    }
    Pet.create(petFromRequest)
    .then((pet) => res.status(200).json({message: "Pet Profile Successfully Created", pet}))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', (req, res) => {
    Pet.update(
        req.body, {where: 
        {id: req.params.id}
        }
    )
    .then(() => res.status(200).json({message: "Pet Profile Updated."}))
    .catch(err => res.status(500).json({error:err}))
})

router.delete('/:id', (req, res) => {
    Pet.destroy(
        {where: {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Pet Profile Deleted"}))
    .catch(err => res.status(500).json({error: err}))
})
module.exports = router;
