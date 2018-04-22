const User = require('mongoose').model('Contest');

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
