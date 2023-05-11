const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controllers/contacts');

router.route('/contacts')
    .post(ctrlContacts.addContact)

module.exports = router;
