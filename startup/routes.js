const room = require('../router/room');
const user = require('../router/users');
const booking = require('../router/booking');

module.exports = function(app) {
    app.use('/api/room', room);
    app.use('/api/user', user);
    app.use('/api/booking', booking);
}