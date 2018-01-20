var jwt = require('jsonwebtoken'); 
var Companion = require('../models/companion');
var authConfig = require('../../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        username: request.username
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}
 
exports.register = function(req, res, next){
 
    var username = req.body.username;
    var password = req.body.password;
 
    if(!username){
        return res.status(422).send({error: 'You must enter an username'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    Companion.findOne({username: username}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That username is already in use'});
        }
 
        var companion = new Companion({
            username: username,
            password: password
        });
 
        companion.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}