const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model.js');
const secrets = require("../config/secrets.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log(user);
  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findUser({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);

        res.status(200).json({message: `Welcome back ${user.username}`, token: token})
      }
      else {
        res.status(500).json({message: "Error on login"})
      }
    })
});


function createToken(user) {
  const payload = {
    userid: user.id,
    user: user.username
  }

  const options = {
    expiresIn: '8h'
  }
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
