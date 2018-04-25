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
    Contest.find({}, (err, contests) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(contests);
        }
    });
};


exports.byYearAndGender = function(req, res, next){
    let year = req.year;
    let gender = req.gender;
    let query = {
        year: year,
        gender: gender
    }
    Contest.findOne(query, (err, contest) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(contest);
        }
    });
};


exports.yearParam = function(req, res, next, year){
    req.year = year;
    next();
}

exports.genderParam = function(req, res, next, gender){
    req.gender = gender;
    next();
}
