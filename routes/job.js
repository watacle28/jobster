const router = require('express').Router();
const Company = require('../models/Company');
const Job = require('../models/Job');

const {
    check,
    validationResult
} = require('express-validator');
//multer configs import
const uploader = require('../utils/upload');
const canCreate_EDIT_DEL = require('../middleware/canEditOrDEL');

//create a job -> pvt
router.post('/create', [
    check('position', 'field can not be empty').not().isEmpty(),
    check('role', 'field can not be empty').not().isEmpty(),
    check('contract', 'field can not be empty').not().isEmpty(),
    check('location', 'field can not be empty').not().isEmpty(),
    check('level', 'field can not be empty').not().isEmpty(),
    check('languages', 'field can not be empty').not().isEmpty(),
    check('tools', 'field can not be empty').not().isEmpty()
], async (req, res) => {
    //check for user input errors and send errors if any
    const {
        user,
        logo,
        company
    } = req.user
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(error => error.msg)
        })
    }
    //fetch company details from db 
    const coDb = await Company.findById(req.user.user);


    const {
        position,
        role,
        level,
        contract,
        location,
        languages,
        tools
    } = req.body;
    let langArray = languages.trim().split(',').map(lang => lang.trim())
    let toolsArray = tools.trim().split(',').map(tool => tool.trim())

    try {
        const newJob = await new Job({
            company,
            logo: coDb.logo,
            companyId: req.user.user,
            isnew: true,
            featured: false,
            position,
            role,
            level,
            postedAt: new Date(),
            contract,
            location,
            languages: langArray,
            tools: toolsArray
        }).save();
        //get user and assign post
        const user = await Company.findById(req.user.user)
        const jobs = user.jobs;
        jobs.push(newJob._id)
        await user.save()

        return res.json({
            newJob
        });

    } catch (error) {
        return res.status(404).json({
            error
        })
    }
})

//edit a job
router.put('/edit/:id', canCreate_EDIT_DEL(Job), async (req, res) => {
   
    const {
        position,
        role,
        level,
        contract,
        location,
        languages,
        tools
    } = req.body;

    try {


        const jobToEdit = res.doc
       
        if (level) jobToEdit.level = level
       
        if (contract) jobToEdit.contract = contract
       
        if (location) jobToEdit.location = location
       
        if (tools) {
           
            let toolsArray = tools.trim().split(',').map(tool => tool.trim())
           
            jobToEdit.tools = toolsArray
          
           
        }
        
        if (position) {

            jobToEdit.position = position

        }
        if (role) {
 
        jobToEdit.role = role

        }
        if (req.body.languages) {
 
            let langArray = languages.trim().split(',').map(lang => lang.trim())
            jobToEdit.languages = langArray

        }
        

        const ans = await jobToEdit.save()
        console.log({ans});
        return res.json({
            editedJob: jobToEdit
        })

    } catch (error) {
        return res.status(400).json({
            error
        })
    }
})
//remove job
router.delete('/delete/:id', canCreate_EDIT_DEL(Job),async (req, res) => {

    try {
        await res.doc.remove()
        const co = await Company.findById(req.user.user)
        co.jobs.pull(req.params.id)
        await co.save()
        return res.json({
            msg: 'job deleted'
        })

    } catch (error) {
        return res.status(404).json({
            err: 'job not found'
        })
    }

})




// postToUnlike.likes.pull(req.user.user)
// await postToUnlike.save();
module.exports = router;