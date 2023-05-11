const mongoose = require('mongoose');

let dbURL = 'mongodb://localhost/contacts';


mongoose.connect(dbURL, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${dbURL}`);
})

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

const dbShutDown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose is disconnected through ${msg}`);
        callback();
    })
}

process.once('SIGUSR2', () => {
    dbShutDown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    })
})

process.once('SIGINT', () => {
    dbShutDown('app termination', () => {
        process.exit(0);
    })
})

require('./users');
require('./contacts');