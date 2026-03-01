import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as UserRepository from '../repositories/userRepository.js';

export async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, config.bcryptRounds);
}

export async function comparePassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}

export function generateToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtTtlSeconds });
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

function stripPasswordHash(user) {
  const { password_hash, ...rest } = user;
  return rest;
}

export async function register({ email, password }) {
  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    throw new Error('Email already registered');
  }
  const passwordHash = await hashPassword(password);
  const user = await UserRepository.createUser({ email, passwordHash });
  return stripPasswordHash(user);
}

export async function login({ email, password }) {
  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken(user.id);
  return { user: stripPasswordHash(user), token };
}
