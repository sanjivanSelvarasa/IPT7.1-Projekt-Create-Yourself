const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const db = require('../database/db');

const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = db.get(
      db.state.userDb,
      'SELECT id, email, username, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const profile = db.get(
      db.state.userDataDb,
      'SELECT bio, avatar_url, twitter, linkedin, github, instagram FROM user_profiles WHERE user_id = ?',
      [req.user.id]
    );
    res.json({
      user: {
        ...user,
        profile: profile || {}
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {