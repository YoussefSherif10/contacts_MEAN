const mongoose = require('mongoose');
const {stringify} = require("nodemon/lib/utils");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    notes: String,
});

mongoose.model('Contact', contactSchema);