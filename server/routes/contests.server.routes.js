const contests = require('../controllers/contests.server.controller');

module.export = function(app) {
    app.route('/api/contests').post(contests.create);
};

