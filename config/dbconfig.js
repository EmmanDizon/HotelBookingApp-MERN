const config = require('config');
const mongoose = require('mongoose');

module.exports = function() {
    let db = config.get('db');
    mongoose.connect(db, {
        useUnifiedTopology: true, useNewUrlParser: true
    })
    .then(() => console.log(`connection to ${db} established`))
    .catch(error => console.error(error))
}