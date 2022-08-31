const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Project",projectSchema);