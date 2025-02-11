const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/person');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({username,email,password: hashedPassword});
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
