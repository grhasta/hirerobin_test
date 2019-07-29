const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'thisisoursecret';


exports.register = function(req, res, next) {
  const { email, password, reviewer } = req.body;
  const user = new User({ email, password, reviewer });
  user.save(function(err) {
    if (err) {
      console.log(err)
      res.status(500).json({ error: err.errmsg });
    } else {
      res.status(200).json({ message: "Welcome to the club!", user_id: user.id });
    }
  })
}

exports.authenticate = function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal error please try again' });
    } else if (!user) {
      res.status(401).json({ error: 'Incorrect email or password' });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({ error: 'Internal error please try again'})
        } else if (!same) {
          res.status(401).json({ error: 'Incorrect email or password' });
        } else {
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ user: email, token: token });
        }
      });
    }
  });
}

exports.ping = function(req, res, next) {
  res.status(200).json({ message: "PING SUCCESSFULLY !!!"})
}