const express = require('express');
const AuthService = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'email is required' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'password is required' });
  }

  try {
    const user = await AuthService.register(email, password);
    return res.status(201).json({ user: { id: user.id, email: user.email, created_at: user.created_at } });
  } catch (err) {
    const message = err instanceof Error ? err.message : err;
    if (message === 'Email already registered') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'email is required' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'password is required' });
  }

  try {
    const result = await AuthService.login(email, password);
    return res.status(200).json({ token: result.token, user: { id: result.user.id, email: result.user.email } });
  } catch (err) {
    const message = err instanceof Error ? err.message : err;
    if (message === 'Invalid credentials') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
