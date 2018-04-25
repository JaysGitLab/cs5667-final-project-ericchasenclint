
const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db);

    require('../models/user.server.model');
    require('../models/article.server.model');
    require('../models/contest.server.model');

    return db;
};

