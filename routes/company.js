const router = require('express').Router();
const axios = require('axios');
const Company = require('../models/Company');
const Dev = require('../models/Dev');
const jwt = require('jsonwebtoken');
//multer configs import
const uploader = require('../utils/upload')


//get company info -> private
router.get('/me', async (req, res) => {
 console.log('his',req);
    try {
        //get user
        const company = await Company.findById({
                _id: req.user.user
            }).select('-password')
            .populate('jobs')
        return res.json({
            company
        })

    } catch (error) {
        return res.status(404).json({
            error: 'user not found'
        })
    }
})


router.post('/upload', uploader.single('avatar'), async (req, res) => {

   
    const user = await Company.findById(
        req.user.user
    )

    //upload avatar
    try {
        user.logo = req.file.url;
        const userWithLogo = await user.save();
        const token = jwt.sign({
            user: userWithLogo._id,
            userType: userWithLogo.userType,
            logo: userWithLogo.logo,
            company: userWithLogo.name
        }, process.env.JWTSecret)
    
        return res.json({
            token,
            user:  userWithLogo
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
})

//edit own profile
router.put('/me', async (req, res) => {

    const company = await Company.findById(req.user.user)
    const {

        location,
        name,
        website,

    } = req.body


    if (!company) {
        return res.status(400).json({
            err: 'user not found'
        })
    }


   
    if (location) company.location = location
    if(name) company.name = name
    if (website) company.website = website


try {
    
    await company.save()
   
    return res.json({
        company
    })

} catch (error) {
    console.log(error);
}
})

router.delete('/me', async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.user.user)
        res.json({
            msg: 'Life is better inside but take care for now, ciao'
        })
    } catch (error) {
        return res.json({
            error
        })
    }
})

//get all devs

router.get('/devs', async(req,res)=>{
    try {
        const devs = await Dev.find();
        res.json({devs})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;