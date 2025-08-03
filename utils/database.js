const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Database {
  constructor() {
    this.db = null;
    this.init();
  }

  async init() {
    try {
      // Create database directory if it doesn't exist
      const dbDir = path.join(__dirname, '..', 'database');
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      const dbPath = path.join(dbDir, 'praktika.db');
      
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error opening database:', err);
        } else {
          console.log('Connected to SQLite database');
          this.initSchema();
        }
      });

      // Enable foreign keys
      this.db.run('PRAGMA foreign_keys = ON');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  async initSchema() {
    try {
      const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
      const seedPath = path.join(__dirname, '..', 'database', 'seed_data.sql');

      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await this.exec(schema);
        console.log('Database schema initialized');

        if (fs.existsSync(seedPath)) {
          const seedData = fs.readFileSync(seedPath, 'utf8');
          await this.exec(seedData);
          console.log('Database seed data loaded');
        }
      }
    } catch (error) {
      console.error('Schema initialization error:', error);
    }
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  queryOne(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  insert(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database connection closed');
          resolve();
        }
      });
    });
  }

  // Utility methods for common operations
  async getUserProgress(userId, languageCode) {
    return this.query(
      `SELECT up.*, l.title as lesson_title, ct.title as topic_title
       FROM user_progress up
       LEFT JOIN lessons l ON up.lesson_id = l.id
       LEFT JOIN conversation_topics ct ON up.topic_id = ct.id
       WHERE up.user_id = ? AND up.language_code = ?
       ORDER BY up.created_at DESC`,
      [userId, languageCode]
    );
  }

  async getVocabularyByLevel(languageCode, level, limit = 50) {
    return this.query(
      `SELECT * FROM vocabulary 
       WHERE language_code = ? AND level = ?
       ORDER BY frequency_score DESC, word ASC
       LIMIT ?`,
      [languageCode, level, limit]
    );
  }

  async getLessonsByLevel(languageCode, level) {
    return this.query(
      `SELECT * FROM lessons 
       WHERE language_code = ? AND level = ?
       ORDER BY difficulty ASC, title ASC`,
      [languageCode, level]
    );
  }

  async getConversationTopics(languageCode, level = null, category = null) {
    let sql = 'SELECT * FROM conversation_topics WHERE language_code = ?';
    const params = [languageCode];

    if (level) {
      sql += ' AND level = ?';
      params.push(level);
    }

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY title ASC';

    return this.query(sql, params);
  }

  async updateUserVocabulary(userId, vocabularyId, isCorrect) {
    const existing = await this.queryOne(
      'SELECT * FROM user_vocabulary WHERE user_id = ? AND vocabulary_id = ?',
      [userId, vocabularyId]
    );

    if (existing) {
      // Update existing record
      const newStrength = isCorrect 
        ? Math.min(100, existing.strength + 10)
        : Math.max(0, existing.strength - 5);

      return this.run(
        `UPDATE user_vocabulary 
         SET strength = ?, last_reviewed = CURRENT_TIMESTAMP, 
             review_count = review_count + 1,
             correct_count = correct_count + ?
         WHERE user_id = ? AND vocabulary_id = ?`,
        [newStrength, isCorrect ? 1 : 0, userId, vocabularyId]
      );
    } else {
      // Create new record
      const initialStrength = isCorrect ? 10 : 0;
      return this.run(
        `INSERT INTO user_vocabulary 
         (user_id, vocabulary_id, strength, last_reviewed, review_count, correct_count)
         VALUES (?, ?, ?, CURRENT_TIMESTAMP, 1, ?)`,
        [userId, vocabularyId, initialStrength, isCorrect ? 1 : 0]
      );
    }
  }
}

// Create singleton instance
const database = new Database();

module.exports = database;