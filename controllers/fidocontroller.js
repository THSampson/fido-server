const express = require('express')
const router = express.Router();
const Fido = require('../db').import('../models/fido');


router.post('/create', (req, res) => {
    const fidoFromRequest = {
      type: req.body.type,
      breed: req.body.breed,
      age: req.body.age,
      goodWithChildren: req.body.child,
      goodWithDogs: req.body.dogs,
      goodWithCats: req.body.cats
    //   ownerID: req.user.id
    }
    Fido.create(fidoFromRequest)
    .then((fido) => res.status(200).json({message: "Fido Successfully Created", fido}))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', (req, res) => {
    Fido.update(
        req.body, {where: 
        {id: req.params.id}
        }
    )
    .then(() => res.status(200).json({message: "Fido Updated."}))
    .catch(err => res.status(500).json({error:err}))
})

router.delete('/:id', (req, res) => {
    Fido.destroy(
        {where: {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Fido Deleted"}))
    .catch(err => res.status(500).json({error: err}))
})
module.exports = router;
