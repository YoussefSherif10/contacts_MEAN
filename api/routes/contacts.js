const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controllers/contacts');

router.route('/contacts')
    .post(ctrlContacts.addContact)
    .get(ctrlContacts.getContacts)

router.route('/contacts/:contactId')
    .delete(ctrlContacts.deleteContact)
    .put(ctrlContacts.editContact)

module.exports = router;
