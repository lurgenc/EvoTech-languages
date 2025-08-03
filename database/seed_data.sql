-- Seed data for Praktika Clone

-- Insert supported languages
INSERT OR REPLACE INTO languages (code, name, native_name, flag_emoji, difficulty_level, script_type) VALUES
('en', 'English', 'English', '🇬🇧', 2, 'latin'),
('es', 'Spanish', 'Español', '🇪🇸', 2, 'latin'),
('fr', 'French', 'Français', '🇫🇷', 3, 'latin'),
('de', 'German', 'Deutsch', '🇩🇪', 4, 'latin'),
('bg', 'Bulgarian', 'Български', '🇧🇬', 4, 'cyrillic');

-- Insert English avatars
INSERT OR REPLACE INTO avatars (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id) VALUES
('Emma', 'en', 'american', 'female', 'adult', 'friendly', 'Stanford graduate with a passion for teaching. Loves traveling and meeting new people.', 'academic', '/avatars/emma.jpg', 'en_emma'),
('James', 'en', 'british', 'male', 'adult', 'professional', 'News editor from London with 10 years of experience. Expert in business English.', 'business', '/avatars/james.jpg', 'en_james'),
('Sarah', 'en', 'american', 'female', 'young', 'enthusiastic', 'Recent college graduate who loves pop culture and social media.', 'casual', '/avatars/sarah.jpg', 'en_sarah');

-- Insert Spanish avatars
INSERT OR REPLACE INTO avatars (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id) VALUES
('Carlos', 'es', 'spain', 'male', 'adult', 'friendly', 'Barcelona native who loves football and teaching Spanish culture.', 'travel', '/avatars/carlos.jpg', 'es_carlos'),
('Isabella', 'es', 'mexico', 'female', 'adult', 'warm', 'Mexican Spanish teacher who loves music, dance, and warm conversations.', 'culture', '/avatars/isabella.jpg', 'es_isabella');

-- Insert French avatars
INSERT OR REPLACE INTO avatars (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id) VALUES
('Marie', 'fr', 'france', 'female', 'adult', 'sophisticated', 'Parisian literature professor with expertise in French culture.', 'academic', '/avatars/marie.jpg', 'fr_marie'),
('Pierre', 'fr', 'france', 'male', 'adult', 'charming', 'French chef who loves cooking and sharing French culinary traditions.', 'culture', '/avatars/pierre.jpg', 'fr_pierre');

-- Insert German avatars
INSERT OR REPLACE INTO avatars (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id) VALUES
('Klaus', 'de', 'germany', 'male', 'adult', 'precise', 'German engineer who loves precision and teaching proper German grammar.', 'business', '/avatars/klaus.jpg', 'de_klaus'),
('Greta', 'de', 'germany', 'female', 'adult', 'patient', 'Munich native who enjoys hiking and teaching German through everyday situations.', 'casual', '/avatars/greta.jpg', 'de_greta');

-- Insert Bulgarian avatars (NEW!)
INSERT OR REPLACE INTO avatars (name, language_code, accent, gender, age_group, personality, backstory, specialization, image_url, voice_id) VALUES
('Dimitar', 'bg', 'sofia', 'male', 'adult', 'warm', 'София родом, историк който обича да разказва българската култура и традиции.', 'culture', '/avatars/dimitar.jpg', 'bg_dimitar'),
('Elena', 'bg', 'plovdiv', 'female', 'adult', 'encouraging', 'Учителка по български език от Пловдив с 15 години опит в преподаването.', 'academic', '/avatars/elena.jpg', 'bg_elena'),
('Georgi', 'bg', 'varna', 'male', 'young', 'energetic', 'Млад IT специалист от Варна който обича да комбинира технологии с езиковото обучение.', 'business', '/avatars/georgi.jpg', 'bg_georgi');

-- Basic Bulgarian vocabulary (Essential words)
INSERT OR REPLACE INTO vocabulary (language_code, word, translation, phonetic, part_of_speech, level, frequency_score, example_sentence, example_translation, tags) VALUES
-- Greetings and basic phrases
('bg', 'Здравей', 'Hello', 'zdrah-vay', 'interjection', 'beginner', 5, 'Здравей, как си?', 'Hello, how are you?', '["greetings", "basic"]'),
('bg', 'Довиждане', 'Goodbye', 'doh-veezh-dah-neh', 'interjection', 'beginner', 5, 'Довиждане, до утре!', 'Goodbye, see you tomorrow!', '["greetings", "basic"]'),
('bg', 'Моля', 'Please', 'mol-ya', 'adverb', 'beginner', 5, 'Моля, помогнете ми.', 'Please, help me.', '["politeness", "basic"]'),
('bg', 'Благодаря', 'Thank you', 'blah-goh-dah-rya', 'interjection', 'beginner', 5, 'Благодаря ви много!', 'Thank you very much!', '["politeness", "basic"]'),
('bg', 'Извинете', 'Excuse me', 'eez-vee-neh-teh', 'interjection', 'beginner', 4, 'Извинете, къде е гарата?', 'Excuse me, where is the train station?', '["politeness", "basic"]'),

-- Family
('bg', 'семейство', 'family', 'seh-may-stvo', 'noun', 'beginner', 4, 'Моето семейство е голямо.', 'My family is big.', '["family", "relationships"]'),
('bg', 'майка', 'mother', 'may-ka', 'noun', 'beginner', 5, 'Майка ми готви вкусно.', 'My mother cooks deliciously.', '["family", "relationships"]'),
('bg', 'баща', 'father', 'bash-ta', 'noun', 'beginner', 5, 'Баща ми работи в офиса.', 'My father works in the office.', '["family", "relationships"]'),
('bg', 'дете', 'child', 'deh-teh', 'noun', 'beginner', 4, 'Детето играе в парка.', 'The child is playing in the park.', '["family", "age"]'),

-- Numbers
('bg', 'едно', 'one', 'ed-no', 'numeral', 'beginner', 5, 'Имам едно ябълка.', 'I have one apple.', '["numbers", "basic"]'),
('bg', 'две', 'two', 'dveh', 'numeral', 'beginner', 5, 'Купих две книги.', 'I bought two books.', '["numbers", "basic"]'),
('bg', 'три', 'three', 'tree', 'numeral', 'beginner', 5, 'Тук има три стола.', 'There are three chairs here.', '["numbers", "basic"]'),

-- Colors
('bg', 'червен', 'red', 'cher-ven', 'adjective', 'beginner', 3, 'Червената роза е красива.', 'The red rose is beautiful.', '["colors", "adjectives"]'),
('bg', 'син', 'blue', 'seen', 'adjective', 'beginner', 3, 'Небето е синьо.', 'The sky is blue.', '["colors", "adjectives"]'),
('bg', 'зелен', 'green', 'zeh-len', 'adjective', 'beginner', 3, 'Зелената трева расте.', 'The green grass grows.', '["colors", "adjectives"]'),

-- Food
('bg', 'храна', 'food', 'hra-na', 'noun', 'beginner', 4, 'Българската храна е вкусна.', 'Bulgarian food is delicious.', '["food", "culture"]'),
('bg', 'вода', 'water', 'vo-da', 'noun', 'beginner', 5, 'Пия вода всеки ден.', 'I drink water every day.', '["drinks", "basic"]'),
('bg', 'хляб', 'bread', 'hlyab', 'noun', 'beginner', 4, 'Хлябът е свеж.', 'The bread is fresh.', '["food", "basic"]'),

-- Time
('bg', 'ден', 'day', 'den', 'noun', 'beginner', 5, 'Днес е хубав ден.', 'Today is a nice day.', '["time", "basic"]'),
('bg', 'нощ', 'night', 'nosht', 'noun', 'beginner', 4, 'Лека нощ!', 'Good night!', '["time", "greetings"]'),
('bg', 'сутрин', 'morning', 'soo-treen', 'noun', 'beginner', 4, 'Сутринта пия кафе.', 'In the morning I drink coffee.', '["time", "daily_routine"]');

-- Basic Bulgarian grammar rules
INSERT OR REPLACE INTO grammar_rules (language_code, rule_name, category, level, explanation, examples, exercises, common_mistakes) VALUES
('bg', 'Cyrillic Alphabet', 'alphabet', 'beginner', 
 'Bulgarian uses the Cyrillic alphabet with 30 letters. Each letter has a specific sound.',
 '["А а - ah", "Б б - bah", "В в - vah", "Г г - gah", "Д д - dah"]',
 '["Practice writing: Баба, Вода, Дом", "Sound recognition exercises"]',
 '["Confusing В with B", "Mixing Р with P"]'),

('bg', 'Definite Article', 'articles', 'beginner',
 'Bulgarian has definite articles that are attached to the end of nouns: -ът/-ят (masculine), -та (feminine), -то (neuter).',
 '["момче → момчето (the boy)", "жена → жената (the woman)", "дете → детето (the child)"]',
 '["Add definite articles to: стол, маса, прозорец"]',
 '["Using wrong article endings", "Forgetting article altogether"]'),

('bg', 'Verb Conjugation - Present Tense', 'verb_conjugation', 'intermediate',
 'Bulgarian verbs change their endings based on the subject. Regular pattern for -a verbs.',
 '["Аз чета (I read)", "Ти четеш (You read)", "Той/тя чете (He/she reads)"]',
 '["Conjugate: играя, работя, уча"]',
 '["Wrong person endings", "Stress placement errors"]'),

('bg', 'Cases System', 'noun_declension', 'intermediate',
 'Bulgarian has remnants of a case system, mainly visible in pronouns and some expressions.',
 '["Nominative: Аз съм тук", "Accusative: Виждам го", "Dative: Давам му книга"]',
 '["Identify cases in sentences", "Use correct pronoun forms"]',
 '["Using wrong pronoun case", "Modern simplification confusion"]');

-- Conversation topics for Bulgarian
INSERT OR REPLACE INTO conversation_topics (language_code, title, description, level, category, scenario, vocabulary, sample_questions, cultural_notes) VALUES
('bg', 'Meeting Someone New', 'Basic introductions and getting to know someone', 'beginner', 'social',
 '{"setting": "Coffee shop in Sofia", "goal": "Introduce yourself and learn about the other person"}',
 '["име", "години", "професия", "град", "семейство"]',
 '["Как се казваш?", "От къде си?", "Какво работиш?", "Имаш ли семейство?"]',
 'Bulgarians often ask about family and work early in conversations. Using formal "Вие" vs informal "ти" is important.'),

('bg', 'Shopping at the Market', 'Buying groceries and negotiating prices', 'beginner', 'daily_life',
 '{"setting": "Traditional Bulgarian market", "goal": "Buy fresh produce and learn market vocabulary"}',
 '["пазар", "домати", "кило", "цена", "пари"]',
 '["Колко струва килото?", "Имате ли свежи домати?", "Може ли отстъпка?"]',
 'Traditional markets are still very popular in Bulgaria. Bargaining is acceptable at outdoor markets.'),

('bg', 'Bulgarian Holidays', 'Discussing traditional celebrations', 'intermediate', 'culture',
 '{"setting": "Family gathering during Koleduvane", "goal": "Learn about Bulgarian traditions"}',
 '["празник", "традиция", "коледуване", "мартеница", "кукери"]',
 '["Кои са най-важните български празници?", "Как празнувате Коледа?", "Какво е мартеница?"]',
 'Bulgaria has unique traditions like Koleduvane (Christmas caroling) and Martenitsa (March 1st tradition).'),

('bg', 'At the Restaurant', 'Ordering traditional Bulgarian food', 'intermediate', 'food',
 '{"setting": "Traditional mehana (tavern)", "goal": "Order a meal and discuss Bulgarian cuisine"}',
 '["меню", "шопска салата", "мусака", "ракия", "сметка"]',
 '["Какво препоръчвате?", "Има ли вегетариански варианти?", "Може ли сметката?"]',
 'Traditional Bulgarian mehanas serve local dishes. Shopska salad and banitsa are must-try foods.');

-- Basic lessons for Bulgarian
INSERT OR REPLACE INTO lessons (language_code, level, category, title, description, objectives, duration_minutes, difficulty, content) VALUES
('bg', 'beginner', 'alphabet', 'Cyrillic Alphabet Basics', 'Learn the Bulgarian Cyrillic alphabet', 
 '["Recognize all 30 Cyrillic letters", "Pronounce each letter correctly", "Write basic words"]', 
 20, 1, 
 '{"introduction": "Bulgarian uses Cyrillic script", "letters": ["А", "Б", "В", "Г", "Д"], "practice": "Write your name in Cyrillic"}'),

('bg', 'beginner', 'vocabulary', 'Essential Greetings', 'Master basic Bulgarian greetings and polite expressions',
 '["Use proper greetings", "Know when to use formal vs informal", "Express politeness"]',
 15, 1,
 '{"greetings": ["Здравей", "Добро утро", "Лека нощ"], "politeness": ["Моля", "Благодаря", "Извинете"]}'),

('bg', 'beginner', 'grammar', 'Basic Sentence Structure', 'Understand how to form simple sentences in Bulgarian',
 '["Form subject-verb-object sentences", "Use present tense verbs", "Ask simple questions"]',
 25, 2,
 '{"structure": "Subject + Verb + Object", "examples": ["Аз чета книга", "Ти говориш български"]}'),

('bg', 'intermediate', 'conversation', 'Family and Relationships', 'Talk about family members and relationships',
 '["Describe family members", "Use possessive pronouns", "Discuss relationships"]',
 30, 3,
 '{"vocabulary": ["семейство", "родители", "деца"], "grammar": ["possessives", "family_terms"]}');

-- Create some sample conversation logs
INSERT OR REPLACE INTO conversation_sessions (user_id, avatar_id, language_code, topic_id, status, conversation_log, feedback, duration_seconds) VALUES
(1, 9, 'bg', 1, 'completed', 
 '[{"speaker": "user", "message": "Здравей!", "timestamp": "2024-01-01T10:00:00Z"}, {"speaker": "avatar", "message": "Здравей! Как се казваш?", "timestamp": "2024-01-01T10:00:05Z"}]',
 '{"pronunciation": "Good effort with Bulgarian sounds", "grammar": "Correct use of greetings", "suggestions": "Practice rolling the R sound"}',
 180);

-- Add some user progress examples
INSERT OR REPLACE INTO user_progress (user_id, language_code, lesson_id, status, score, time_spent) VALUES
(1, 'bg', 1, 'completed', 85, 20),
(1, 'bg', 2, 'in_progress', 70, 10);