const {
    Schema,
    model
} = require('mongoose');

const JobSchema = Schema({
    company: String,
    companyId: {
        type: Schema.Types.ObjectId,
        refs: 'Company'
    },
    logo: String,
    isnew: Boolean,
    featured: Boolean,
    position: String,
    role: String,
    level: String,
    postedAt: Date,
    contract: String,
    location: String,
    languages: [String],
    applications: [{type: Schema.Types.ObjectId, refs:'Dev'}],
    tools: [String],
    verified: {
        type: Boolean,
        default: false
    },


}, {
    timestamps: true
})

module.exports = model('Job', JobSchema)