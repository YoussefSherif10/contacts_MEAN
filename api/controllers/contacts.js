const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const jwt = require('jsonwebtoken');

const addContact = async (req, res) => {
    if (!(req.body.name && req.body.phone))
        res.status(400).json({msg: "name and phone are required fields"});

    try {
        const contact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            notes: req.body.notes
        });
        res.status(201).json(contact);
    } catch {
        res.status(500).json({msg: "something went wrong"});
    }
}

const getContacts = async (req, res) => {
    try {
        const skip = parseInt(req.query.skip);
        const limit = 5;
        const contacts = await Contact.find({}).skip(skip).limit(limit).exec();
        const count = await Contact.count();
        const pages = Math.ceil(count / 5);
        res.status(200).json({contacts, pages});
    } catch {
        res.status(500).json({msg: "Something went wrong"});
    }
}

const deleteContact = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactId).then(response => {
        res.status(200).json({msg: "deleted"});
    }).catch(() => {
        res.status(500).json({msg: "Something went wrong"});
    })
}

const editContact = async (req, res) => {
    try {
        let contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
        res.status(200).json(contact);
    } catch {
        res.status(500).json({msg: "Something went wrong"});
    }
}

module.exports = {addContact, getContacts, deleteContact, editContact};