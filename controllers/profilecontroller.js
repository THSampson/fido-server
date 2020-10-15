const express = require('express')
const router = express.Router();
const Profile = require('../db').import('../models/userprofile');
const validateSession = require('../middleware/sessionToken');

//Create Profile
router.post('/create', (req, res) => {
    const profileInfo = {
      name: req.body.name,
      age: req.body.age,
      hasKids: req.body.kids,
      otherPets: req.body.pets,
      location: req.body.location,
    }
    Profile.create(profileInfo)
    .then((profile) => res.status(200).json({message: "Profile Successfully Created", profile}))
    .catch(err => res.status(500).json({error: err}))
})

// Get Profile
router.get('/',  (req, res) => { 
    Profile.findOne(
        {where: 
            {userId: req.user.id}
                })
.then((profile) => res.status(200).json(profile))
.catch(err => res.status(500).json({error:err}))
})

//Update Profile
router.put('/:id',  (req, res) => {
    Profile.update(
        req.body, {where: 
    {id: req.params.id}
        })
    .then(() => res.status(200).json({message: "Profile Updated."}))
    .catch(err => res.status(500).json({error:err}))
})

//Delete Profile
router.delete('/:id', (req, res) => {
    Profile.destroy(
        {where: {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Profile Deleted"}))
    .catch(err => res.status(500).json({error: err}))
})
module.exports = router;
