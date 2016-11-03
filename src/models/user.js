var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    url: String,
    votedPosts: [ 
        {
            id: mongoose.Schema.Types.ObjectId,
            isupvoted: Boolean
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);