const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    catwayType: {
        type: String,
        enum: ['long', 'short'], // longeur de catwayState
        required: true
    },
    catwayState: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Catway', catwaySchema);
