const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ROUTE 1 :create a User using  POST : api/auth/createuser 
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

    const data = {
      user: {
        id: user.id
      }
    }

    const jwttoken = jwt.sign(data, process.env.JWT_SECRET);

    //res.json(user)
    res.json({ jwttoken })
  }

  catch (error) {

    console.error(error.message);
  }

})


// ROUTE 2 : Authenticate  a User using  POST : api/auth/login  // no login required 

router.post('/login', [

  body('email').isEmail(),
  body('password').isLength({ min: 6 })

], async (req, res) => {
  const errors = validationResult(req);
  // if there are errors send bad requests
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please login with correct credentials !" });

    }

    const passwordcom = await bcrypt.compare(password, user.password);

    if (!passwordcom) {
      return res.status(400).json({ error: "Please login with correct credentials !" });

    }


    const data = {
      user: {
        id: user.id
      }
    }

    const jwttoken = jwt.sign(data, process.env.JWT_SECRET);

    //res.json(user)
    res.json({ jwttoken })


  } catch (error) {

    console.error(error.message);
    res.status(400).send("Internal erroe occured ")
  }


})

// ROUTE 2 : Get the details of logged in  User using  POST : api/auth/getuser // login required 

router.post('/getuser', fetchuser ,async (req, res) => {
 


  try {

    const userId =  req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)


  } catch (error) {

  }

})

module.exports = router