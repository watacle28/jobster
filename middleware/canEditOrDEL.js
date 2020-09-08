const Dev = require("../models/Dev");
const Company = require("../models/Company");


const canCreate_EDIT_DEL = (model) => {
    return async (req, res, next) => {
        
        if (req.user.userType !== 'Company') {
            
            return res.json({
                err: 'you need  a company account to proceed'
            });
        }


        //doc owner  
        try {
            if (req.params.id) {
                const doc = await model.findById(req.params.id)
               
                if (doc.companyId != req.user.user) {
                    return res.status(400).json({
                        msg: 'not allowed'
                    })
                }
                res.doc = doc;
            }

            next()
        } catch (error) {
            console.log({
                error
            });
        }
    }
}


module.exports = canCreate_EDIT_DEL