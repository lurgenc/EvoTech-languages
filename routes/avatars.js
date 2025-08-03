const express = require('express');
const router = express.Router();
const Database = require('../utils/database');

// Get all avatars for a specific language
router.get('/:languageCode', async (req, res) => {
  try {
    const { languageCode } = req.params;
    const avatars = await Database.query(
      'SELECT * FROM avatars WHERE language_code = ? ORDER BY name',
      [languageCode]
    );
    res.json(avatars);
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
});

// Get specific avatar by ID
router.get('/id/:avatarId', async (req, res) => {
  try {
    const { avatarId } = req.params;
    const avatar = await Database.queryOne(
      'SELECT * FROM avatars WHERE id = ?',
      [avatarId]
    );
    
    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    
    res.json(avatar);
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

// Get avatars filtered by specialization
router.get('/:languageCode/specialization/:specialization', async (req, res) => {
  try {
    const { languageCode, specialization } = req.params;
    const avatars = await Database.query(
      'SELECT * FROM avatars WHERE language_code = ? AND specialization = ? ORDER BY name',
      [languageCode, specialization]
    );
    res.json(avatars);
  } catch (error) {
    console.error('Error fetching specialized avatars:', error);
    res.status(500).json({ error: 'Failed to fetch specialized avatars' });
  }
});

// Get avatar's conversation history with user
router.get('/:avatarId/conversations/:userId', async (req, res) => {
  try {
    const { avatarId, userId } = req.params;
    const limit = req.query.limit || 10;
    
    const conversations = await Database.query(
      `SELECT cs.*, ct.title as topic_title 
       FROM conversation_sessions cs
       LEFT JOIN conversation_topics ct ON cs.topic_id = ct.id
       WHERE cs.avatar_id = ? AND cs.user_id = ?
       ORDER BY cs.started_at DESC
       LIMIT ?`,
      [avatarId, userId, limit]
    );
    
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});

// Create new avatar (admin function)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      language_code,
      accent,
      gender,
      age_group,
      personality,
      backstory,
      specialization,
      image_url,
      voice_id
    } = req.body;

    const avatarId = await Database.insert(
      `INSERT INTO avatars 
       (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id]
    );

    const newAvatar = await Database.queryOne(
      'SELECT * FROM avatars WHERE id = ?',
      [avatarId]
    );

    res.status(201).json(newAvatar);
  } catch (error) {
    console.error('Error creating avatar:', error);
    res.status(500).json({ error: 'Failed to create avatar' });
  }
});

// Update avatar information
router.put('/:avatarId', async (req, res) => {
  try {
    const { avatarId } = req.params;
    const updateFields = req.body;
    
    // Build dynamic update query
    const fields = Object.keys(updateFields);
    const values = Object.values(updateFields);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    await Database.query(
      `UPDATE avatars SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, avatarId]
    );
    
    const updatedAvatar = await Database.queryOne(
      'SELECT * FROM avatars WHERE id = ?',
      [avatarId]
    );
    
    res.json(updatedAvatar);
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Failed to update avatar' });
  }
});

// Get avatar statistics
router.get('/:avatarId/stats', async (req, res) => {
  try {
    const { avatarId } = req.params;
    
    const stats = await Database.queryOne(
      `SELECT 
        COUNT(*) as total_conversations,
        AVG(duration_seconds) as avg_duration,
        COUNT(DISTINCT user_id) as unique_users,
        MAX(started_at) as last_conversation
       FROM conversation_sessions 
       WHERE avatar_id = ?`,
      [avatarId]
    );
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching avatar stats:', error);
    res.status(500).json({ error: 'Failed to fetch avatar statistics' });
  }
});

module.exports = router;