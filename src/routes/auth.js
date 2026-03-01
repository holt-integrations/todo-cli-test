import { Router } from 'express';
import AuthService from '../services/authService.js';

const router = Router();

function validateAuthBody(req, res) {
  const { email, password } = req.body ?? {};

  if (!email || typeof email !== 'string') {
    res.status(400).json({ error: 'email is required' });
    return false;
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'password is required' });
    return false;
  }

  return true;
}

router.post('/register', async (req, res, next) => {
  if (!validateAuthBody(req, res)) return;

  try {
    const user = await AuthService.register(req.body.email, req.body.password);
    res.status(201).json({ user });
  } catch (err) {
    if (err.message === 'Email already registered') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  if (!validateAuthBody(req, res)) return;

  try {
    const { token, user } = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json({ token, user });
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    next(err);
  }
});

export default router;
