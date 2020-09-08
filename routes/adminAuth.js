const router = require('express').Router()
const Dev = require('../models/Dev')
const Co = require('../models/Company')
const Admin = require('../models/Admin')
const {
    check,
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const axios = require('axios')

//register dev > public
router.post('/register', [
    check('password').trim()
    .isLength({
        min: 6
    }).withMessage('password must be at least 6 alphanumerical characters long '),
    check('fullname', 'field must not be empty').trim().not().isEmpty(),
    check('email').trim().not().isEmpty().withMessage('email must be included').isEmail().withMessage('looks like you entered an invalid email')
], async (req, res) => {
    const devs = await Dev.estimatedDocumentCount()
    const cos = await Co.estimatedDocumentCount()

    if (devs !== 0 && cos !== 0) {
        return res.doc({
            msg: 'too late bro'
        })
    }

    const {
        password,
        fullname,
        email
    } = req.body
    //check for user input errors and send errors if any
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(error => error.msg)
        })
    }

    //get user location

    const noImg = 'https://res.cloudinary.com/watacle/image/upload/v1595939610/Bloggie/Jobist/nopic_crbzxa.jpg'
    // hash password
    const hashedPwd = await bcrypt.hash(password, 10)
    // create user
    try {
        const newAdmin = await new Admin({
            fullname,
            email,
            password: hashedPwd,

        }).save()

        //create token for new user
        const token = jwt.sign({
            user: newAdmin._id,
            userType: newAdmin.userType
        }, process.env.JWTSecret)
        return res.json({
            newAdmin,
            token
        })

    } catch (error) {
        if (error.code == 11000 && error.keyValue.username == username) {
            return res.status(400).json({
                errors: ['username is already in use']
            })
        }
        if (error.code == 11000 && error.keyValue.email == email) {
            return res.status(400).json({
                errors: ['email is already taken']
            })
        }
        return res.status(500).json({
            error
        })
    }


})

//user login -> public
router.post('/login', [
    check('email', 'you must include a valid email address').trim().not().isEmpty(),
    check('password', 'please include a password that you used to register for the account').trim().not().isEmpty()
], async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(error => error.msg)
        })
    }
    //check user auth details against db
    const admin = await Admin.findOne({
        email
    });

    if (!admin) {

        return res.status(400).json({
            errors: ['no account associated with the entered email']
        })

    }
    //check if password is correct
    const isPwd = await bcrypt.compare(password, admin.password)
    if (!isPwd) {
        const errors = ['you entered an incorrect password']
        return res.status(400).json({
            errors
        })
    }

    //create token 
    const token = jwt.sign({
        user: newAdmin._id,
        userType: newAdmin.userType
    }, process.env.JWTSecret)

    return res.status(200).json({
        token,
        admin
    })

})


module.exports = router;