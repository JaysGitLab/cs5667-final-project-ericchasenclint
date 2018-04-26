const contests = require('../controllers/contests.server.controller');

module.exports = function(app) {
    app.route('/api/contests')
        .post(contests.create)
        .get(contests.list);
    app.route('/api/contests/:contestId')
        .get(contests.read);

    app.param('contestId', contests.contestByID);
    
};

