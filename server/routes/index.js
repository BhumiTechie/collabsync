var express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var router = express.Router();

router.post('/signup',async (req,res)=>{
      try {
        const {name , email, password, role} = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message : "User Already exists"});
        user = new User({name, email, password, role});
        await user.save();
        const token = jwt.sign({ id: user._id, role : user.role}, 'secretKey', {expiresIn: '1h'});
        res.json({token});
      } catch (error) {
         console.error("Signup error:", error); // {{ edit_2 }}
         res.status(500).send("Server Error");
      }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


module.exports = router;
