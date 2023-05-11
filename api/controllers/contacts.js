const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const jwt = require('jsonwebtoken');

const addContact = async (req, res) => {
    if (!(req.body.name && req.body.phone))
        res.status(400).json({msg: "name and phone are required fields"});

    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch {
        res.status(500).json({msg: "something went wrong"});
    }
}

module.exports = {addContact};