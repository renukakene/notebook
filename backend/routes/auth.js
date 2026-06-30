const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/' , async (req , res) =>{

 console.log(req.body);
 const user = User(req.body);
 await user.save()  


 res.send("hello")
})

module.exports = router