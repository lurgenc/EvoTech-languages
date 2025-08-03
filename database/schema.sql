-- Praktika Clone Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    native_language TEXT DEFAULT 'tr',
    learning_languages TEXT, -- JSON array of learning languages
    level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced
    profile_image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL, -- en, es, fr, de, bg
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    flag_emoji TEXT,
    difficulty_level INTEGER DEFAULT 1, -- 1-5 scale
    rtl BOOLEAN DEFAULT FALSE, -- right-to-left
    script_type TEXT DEFAULT 'latin', -- latin, cyrillic, etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Avatars table
CREATE TABLE IF NOT EXISTS avatars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    language_code TEXT NOT NULL,
    accent TEXT, -- american, british, spain, mexico, etc.
    gender TEXT, -- male, female, neutral
    age_group TEXT, -- young, adult, senior
    personality TEXT, -- friendly, professional, enthusiastic, etc.
    backstory TEXT,
    specialization TEXT, -- business, travel, academic, casual
    image_url TEXT,
    voice_id TEXT, -- for TTS
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_code TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL, -- grammar, vocabulary, conversation, pronunciation
    title TEXT NOT NULL,
    description TEXT,
    objectives TEXT, -- JSON array
    duration_minutes INTEGER DEFAULT 15,
    difficulty INTEGER DEFAULT 1, -- 1-5
    content TEXT, -- JSON lesson content
    prerequisites TEXT, -- JSON array of lesson IDs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- Conversation topics table
CREATE TABLE IF NOT EXISTS conversation_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT NOT NULL,
    category TEXT, -- travel, business, daily_life, culture, etc.
    scenario TEXT, -- JSON scenario details
    vocabulary TEXT, -- JSON key vocabulary
    sample_questions TEXT, -- JSON array
    cultural_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    language_code TEXT NOT NULL,
    lesson_id INTEGER,
    topic_id INTEGER,
    status TEXT DEFAULT 'not_started', -- not_started, in_progress, completed
    score INTEGER,
    time_spent INTEGER, -- minutes
    mistakes TEXT, -- JSON array of mistakes for analysis
    strengths TEXT, -- JSON array of strengths
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (language_code) REFERENCES languages(code),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (topic_id) REFERENCES conversation_topics(id)
);

-- Conversation sessions table
CREATE TABLE IF NOT EXISTS conversation_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    avatar_id INTEGER NOT NULL,
    language_code TEXT NOT NULL,
    topic_id INTEGER,
    status TEXT DEFAULT 'active', -- active, completed, abandoned
    conversation_log TEXT, -- JSON conversation history
    feedback TEXT, -- JSON AI feedback
    duration_seconds INTEGER,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (avatar_id) REFERENCES avatars(id),
    FOREIGN KEY (language_code) REFERENCES languages(code),
    FOREIGN KEY (topic_id) REFERENCES conversation_topics(id)
);

-- Vocabulary table
CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_code TEXT NOT NULL,
    word TEXT NOT NULL,
    translation TEXT NOT NULL,
    phonetic TEXT,
    part_of_speech TEXT,
    level TEXT NOT NULL,
    frequency_score INTEGER DEFAULT 1, -- 1-5 (how common the word is)
    audio_url TEXT,
    example_sentence TEXT,
    example_translation TEXT,
    tags TEXT, -- JSON array (colors, food, emotions, etc.)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- Grammar rules table
CREATE TABLE IF NOT EXISTS grammar_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_code TEXT NOT NULL,
    rule_name TEXT NOT NULL,
    category TEXT, -- verb_conjugation, noun_declension, word_order, etc.
    level TEXT NOT NULL,
    explanation TEXT NOT NULL,
    examples TEXT, -- JSON array of examples
    exercises TEXT, -- JSON array of practice exercises
    common_mistakes TEXT, -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- User vocabulary progress
CREATE TABLE IF NOT EXISTS user_vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    vocabulary_id INTEGER NOT NULL,
    strength INTEGER DEFAULT 0, -- 0-100 mastery level
    last_reviewed DATETIME,
    review_count INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_languages_code ON languages(code);
CREATE INDEX IF NOT EXISTS idx_avatars_language ON avatars(language_code);
CREATE INDEX IF NOT EXISTS idx_lessons_language_level ON lessons(language_code, level);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_lang ON user_progress(user_id, language_code);
CREATE INDEX IF NOT EXISTS idx_vocabulary_language_level ON vocabulary(language_code, level);
CREATE INDEX IF NOT EXISTS idx_conversation_sessions_user ON conversation_sessions(user_id);