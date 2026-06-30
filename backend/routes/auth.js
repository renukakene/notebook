const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })

], async (req, res) => {
  const errors = validationResult(req);
  // if there are errors send bad requests
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // checks if user is already present 
  try {

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "sorry email already exist" })
    }
    
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass
    })
    res.json(user)
  }

  catch (error) {

    console.error(error.message);
  }

})

module.exports = router