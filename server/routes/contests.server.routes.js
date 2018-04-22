const contests = require('../controllers/contests.server.controller');

module.exports = function(app) {
    app.route('/api/contests').post(contests.create);
};

