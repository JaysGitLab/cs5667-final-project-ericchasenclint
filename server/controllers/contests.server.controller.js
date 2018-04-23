const Contest = require('mongoose').model('Contest');

exports.create = function(req, res, next) {
    const contest= new Contest(req.body);
    contest.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(contest);
        }
    });
};

exports.list = function(req, res, next) {
    Contest.find({}, (err, users) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(users);
        }
    });
};

exports.read = function(req, res) {
    console.log("From contests.server.controller: " + req.contest);
    res.json(req.contest);
}

exports.contestByID = function(req, res, next, id) {
    Contest.findOne({
        _id: id
    }, (err, contest) => {
        if (err) {
            return next(err);
        } else {
            req.contest = contest;
            next();
        }
    });
};
