var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var CompanionSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
}, {
    timestamps: true
});
 
CompanionSchema.pre('save', function(next){
 
    var companion = this;
    var SALT_FACTOR = 5;
 
    if(!companion.isModified('password')){
        return next();
    }
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(companion.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            companion.password = hash;
            next();
 
        });
 
    });
 
});
 
CompanionSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}
 
module.exports = mongoose.model('Companion', CompanionSchema);