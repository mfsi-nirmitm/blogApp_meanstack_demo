const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const router = express.Router();

router.post('/signup', (req, res, next) => {
//  bcrypt.hash(req.body.password, 10).then((hash) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(result => {
        console.log("here 2");
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
//  });

});

module.exports = router;
