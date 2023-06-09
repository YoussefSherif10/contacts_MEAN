const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    if (!(req.body.name && req.body.password))
        res.status(400).json({msg: "All fields are required"});

    let user;
    try {
        user = await User.findOne({name: req.body.name}).exec();

        const token = jwt.sign({
            name: user.name
        }, "ThisIsSecret", {expiresIn: "1d"})

        res.status(200).json(token);

    } catch {
        res.status(404).json({msg: "User not found"});
    }
}

module.exports = {login};