const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: (req, res) => {
    User.findOne({ email: req.body.email }).then((result) => {
      if (result) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          role: req.body.role||'admin',
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((result) => res.json(result))
                .catch((err) => res.json(err));
            });
        })
      }
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(404).json({ email: "Email not Found" });
      }
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            fullname: user.fullname,
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                id: user.id,
                role: user.role
              });
            }
          );
        } else {
          return res.status(400).json("Password Incorrect");
        }
      });
    });
  },
};
