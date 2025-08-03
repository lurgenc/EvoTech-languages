const express = require('express');
const router = express.Router();
const Database = require('../utils/database');

// Get all supported languages
router.get('/', async (req, res) => {
  try {
    const languages = await Database.query(
      'SELECT * FROM languages ORDER BY difficulty_level, name'
    );
    res.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// Get specific language by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const language = await Database.queryOne(
      'SELECT * FROM languages WHERE code = ?',
      [code]
    );
    
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    
    res.json(language);
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({ error: 'Failed to fetch language' });
  }
});

// Get vocabulary for a language and level
router.get('/:code/vocabulary', async (req, res) => {
  try {
    const { code } = req.params;
    const { level = 'beginner', limit = 50, tag } = req.query;
    
    let sql = `
      SELECT v.*, 
             CASE WHEN uv.id IS NOT NULL THEN uv.strength ELSE 0 END as user_strength
      FROM vocabulary v
      LEFT JOIN user_vocabulary uv ON v.id = uv.vocabulary_id AND uv.user_id = ?
      WHERE v.language_code = ? AND v.level = ?
    `;
    const params = [req.user?.id || 0, code, level];
    
    if (tag) {
      sql += ' AND v.tags LIKE ?';
      params.push(`%"${tag}"%`);
    }
    
    sql += ' ORDER BY v.frequency_score DESC, v.word LIMIT ?';
    params.push(parseInt(limit));
    
    const vocabulary = await Database.query(sql, params);
    res.json(vocabulary);
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

// Get grammar rules for a language
router.get('/:code/grammar', async (req, res) => {
  try {
    const { code } = req.params;
    const { level, category } = req.query;
    
    let sql = 'SELECT * FROM grammar_rules WHERE language_code = ?';
    const params = [code];
    
    if (level) {
      sql += ' AND level = ?';
      params.push(level);
    }
    
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    
    sql += ' ORDER BY level, rule_name';
    
    const grammar = await Database.query(sql, params);
    res.json(grammar);
  } catch (error) {
    console.error('Error fetching grammar rules:', error);
    res.status(500).json({ error: 'Failed to fetch grammar rules' });
  }
});

// Get conversation topics for a language
router.get('/:code/topics', async (req, res) => {
  try {
    const { code } = req.params;
    const { level, category } = req.query;
    
    const topics = await Database.getConversationTopics(code, level, category);
    res.json(topics);
  } catch (error) {
    console.error('Error fetching conversation topics:', error);
    res.status(500).json({ error: 'Failed to fetch conversation topics' });
  }
});

// Get lessons for a language
router.get('/:code/lessons', async (req, res) => {
  try {
    const { code } = req.params;
    const { level } = req.query;
    
    const lessons = level 
      ? await Database.getLessonsByLevel(code, level)
      : await Database.query(
          'SELECT * FROM lessons WHERE language_code = ? ORDER BY level, difficulty',
          [code]
        );
    
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get language statistics
router.get('/:code/stats', async (req, res) => {
  try {
    const { code } = req.params;
    
    const stats = await Database.queryOne(
      `SELECT 
        (SELECT COUNT(*) FROM vocabulary WHERE language_code = ?) as vocabulary_count,
        (SELECT COUNT(*) FROM lessons WHERE language_code = ?) as lessons_count,
        (SELECT COUNT(*) FROM conversation_topics WHERE language_code = ?) as topics_count,
        (SELECT COUNT(*) FROM avatars WHERE language_code = ?) as avatars_count,
        (SELECT COUNT(DISTINCT user_id) FROM user_progress WHERE language_code = ?) as learners_count`,
      [code, code, code, code, code]
    );
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching language stats:', error);
    res.status(500).json({ error: 'Failed to fetch language statistics' });
  }
});

// Get popular vocabulary words for a language
router.get('/:code/vocabulary/popular', async (req, res) => {
  try {
    const { code } = req.params;
    const limit = req.query.limit || 20;
    
    const words = await Database.query(
      `SELECT v.*, COUNT(uv.id) as popularity_score
       FROM vocabulary v
       LEFT JOIN user_vocabulary uv ON v.id = uv.vocabulary_id
       WHERE v.language_code = ?
       GROUP BY v.id
       ORDER BY popularity_score DESC, v.frequency_score DESC
       LIMIT ?`,
      [code, parseInt(limit)]
    );
    
    res.json(words);
  } catch (error) {
    console.error('Error fetching popular vocabulary:', error);
    res.status(500).json({ error: 'Failed to fetch popular vocabulary' });
  }
});

// Bulgarian-specific endpoints
router.get('/bg/cyrillic/alphabet', async (req, res) => {
  try {
    const alphabet = [
      { letter: 'А', lowercase: 'а', sound: 'ah', example: 'Аз (I)' },
      { letter: 'Б', lowercase: 'б', sound: 'bah', example: 'Баба (grandmother)' },
      { letter: 'В', lowercase: 'в', sound: 'vah', example: 'Вода (water)' },
      { letter: 'Г', lowercase: 'г', sound: 'gah', example: 'Град (city)' },
      { letter: 'Д', lowercase: 'д', sound: 'dah', example: 'Дом (home)' },
      { letter: 'Е', lowercase: 'е', sound: 'eh', example: 'Едно (one)' },
      { letter: 'Ж', lowercase: 'ж', sound: 'zhah', example: 'Жена (woman)' },
      { letter: 'З', lowercase: 'з', sound: 'zah', example: 'Зима (winter)' },
      { letter: 'И', lowercase: 'и', sound: 'ee', example: 'Име (name)' },
      { letter: 'Й', lowercase: 'й', sound: 'y', example: 'Май (May)' },
      { letter: 'К', lowercase: 'к', sound: 'kah', example: 'Къща (house)' },
      { letter: 'Л', lowercase: 'л', sound: 'lah', example: 'Лято (summer)' },
      { letter: 'М', lowercase: 'м', sound: 'mah', example: 'Майка (mother)' },
      { letter: 'Н', lowercase: 'н', sound: 'nah', example: 'Нощ (night)' },
      { letter: 'О', lowercase: 'о', sound: 'oh', example: 'Око (eye)' },
      { letter: 'П', lowercase: 'п', sound: 'pah', example: 'Пролет (spring)' },
      { letter: 'Р', lowercase: 'р', sound: 'rah', example: 'Река (river)' },
      { letter: 'С', lowercase: 'с', sound: 'sah', example: 'Сън (dream)' },
      { letter: 'Т', lowercase: 'т', sound: 'tah', example: 'Три (three)' },
      { letter: 'У', lowercase: 'у', sound: 'oo', example: 'Ухо (ear)' },
      { letter: 'Ф', lowercase: 'ф', sound: 'fah', example: 'Фамилия (surname)' },
      { letter: 'Х', lowercase: 'х', sound: 'hah', example: 'Хляб (bread)' },
      { letter: 'Ц', lowercase: 'ц', sound: 'tsah', example: 'Цвят (color)' },
      { letter: 'Ч', lowercase: 'ч', sound: 'chah', example: 'Час (hour)' },
      { letter: 'Ш', lowercase: 'ш', sound: 'shah', example: 'Школа (school)' },
      { letter: 'Щ', lowercase: 'щ', sound: 'sht', example: 'Щастие (happiness)' },
      { letter: 'Ъ', lowercase: 'ъ', sound: 'uh', example: 'Връх (peak)' },
      { letter: 'Ь', lowercase: 'ь', sound: 'soft sign', example: 'Кон (horse)' },
      { letter: 'Ю', lowercase: 'ю', sound: 'yu', example: 'Юг (south)' },
      { letter: 'Я', lowercase: 'я', sound: 'ya', example: 'Ягода (strawberry)' }
    ];
    
    res.json(alphabet);
  } catch (error) {
    console.error('Error fetching Cyrillic alphabet:', error);
    res.status(500).json({ error: 'Failed to fetch Cyrillic alphabet' });
  }
});

// Bulgarian cultural topics
router.get('/bg/culture', async (req, res) => {
  try {
    const culturalTopics = [
      {
        title: 'Мартеници (Martenitsa)',
        description: 'Traditional red and white string bracelets worn in March',
        significance: 'Symbol of spring, health, and good luck',
        when: 'March 1st - when you see the first stork, swallow, or blossoming tree'
      },
      {
        title: 'Коледуване (Koleduvane)',
        description: 'Christmas caroling tradition with special songs',
        significance: 'Brings blessings and good wishes for the new year',
        when: 'Christmas Eve and Christmas Day'
      },
      {
        title: 'Кукери (Kukeri)',
        description: 'Masked dancers who chase away evil spirits',
        significance: 'Ancient ritual for fertility and good harvest',
        when: 'New Year and early spring festivals'
      },
      {
        title: 'Нестинарство (Nestinarstvo)',
        description: 'Fire-dancing ritual from the Strandzha region',
        significance: 'Spiritual cleansing and connection with ancestors',
        when: 'Saints Constantine and Helen Day (June 3-4)'
      }
    ];
    
    res.json(culturalTopics);
  } catch (error) {
    console.error('Error fetching Bulgarian culture:', error);
    res.status(500).json({ error: 'Failed to fetch Bulgarian cultural topics' });
  }
});

module.exports = router;