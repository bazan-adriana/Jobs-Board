const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    company: {
        type: String,
        required: [true, 'Company is required'],
        minlength: [3, 'Company must be at least 3 characters long']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [70000, 'Salary must be grater than 70k']
    },
    isRemote: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// export this model
module.exports.Job = mongoose.model('Job', JobSchema);
