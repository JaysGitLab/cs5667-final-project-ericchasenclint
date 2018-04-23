const Contest = require('mongoose').model('Contest');

exports.create = function(req, res, next) {
    console.log(req.body);
    const contest= new Contest(req.body);
    console.log(contest);
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
