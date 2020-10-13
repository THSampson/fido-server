const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create User
router.post('/register', (req, res) => {
    User.create({
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    })
    .then(
        createSucess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            res.json({
                user: user,
                message: 'User Created =^.^=',
                sessionToken: token
            })
        },
        createError = err => res.status(500).json(err)
    )
})

//Login 
router.post('/login', (req, res) => {
    User.findOne({where: {email: req.body.email}})
    .then(
        user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                    res.json({
                        user: user,
                        message: 'User Logged In (U・x・U)',
                        sessionToken: token
                    })
                    
            } else {
                res.status(502).send({error: "Bad Gateway"})
            }})
            } else {
                res.status(501).send({error: "Failed to Process"})
            }
        }
    )
})

//Update User
router.put('/:id', (req, res) => {
    User.update(
        req.body, {where:
        {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Profile Updated."}))
    .catch(() => res.status(500).json({error: er}))
});


//Delete User
router.delete('/:id', (req, res) => {
    User.destroy(
        {where: {id: req.params.id}}
    )
    .then(() => res.status(200).json({message: "Profile Deleted."}))
    .catch(() => res.status(500).json({error: err}))
})
module.exports = router;