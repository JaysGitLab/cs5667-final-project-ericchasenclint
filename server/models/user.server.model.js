const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type:String,
        index: true,
        match: /.+\@.+\..|/,
        trim: true,
        unique: true,
        required: true
    },
    password: {
       type:  String,
       validate: [
        function(password) {
            return password.length >= 6 && password.length != 0;
        },

        'Password should be longer than 5 characters.'
       ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    create: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    website: {
        type: String,
        get: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 &&
                    url.indexof('https://') !== 0) {
                        url = 'http://' + url;
                }

                return url;
            }
        },
        set: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 &&
                    url.indexOf('https://') !== 0){
                        url = 'http://' + url;
                }

                return url;
             }
        }
    }
});

/*
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
}).
set(function(fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});
*/

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new

        Buffer(crypto.randomBytes(16).toString('base64'), 'base64');

        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.fundUniqueUsername = function(username, suffix, callback) {
    var possibleUsername = username + (suffix || '');

    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!err) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', { getters: true, virtuals: true });
mongoose.model('User', UserSchema);

