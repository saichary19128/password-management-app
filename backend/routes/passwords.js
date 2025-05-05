const express = require('express');
const jwt = require('jsonwebtoken');
const Password = require('../models/Password');
const router = express.Router();

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

router.get('/', auth, async (req, res) => {
  const passwords = await Password.find({ userId: req.user.id });
  res.json(passwords);
});

router.post('/', auth, async (req, res) => {
  const newPwd = new Password({ ...req.body, userId: req.user.id });
  const saved = await newPwd.save();
  res.json(saved);
});

router.delete('/:id', auth, async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
