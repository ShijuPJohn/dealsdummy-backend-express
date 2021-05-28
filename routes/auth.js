const express = require("express");
const User = require("../models/User");
const {check, validationResult} = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth')
const dotenv = require("dotenv");


router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
], (async (req, res) => {
    console.log('this called 1')
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({status: error.array()})
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        console.log(user)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "invalid credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log('ismatch', isMatch)
        if (!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "invalid credentials"
            })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        }, (err, token) => {
            if (err) {
                throw err
            } else {
                console.log('here2')
                res.send({
                    token: token
                })

            }
        })
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
}))


router.get('/', auth, (async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
}))

module.exports = router;