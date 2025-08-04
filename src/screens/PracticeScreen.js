import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PracticeScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);
  const [practiceMode, setPracticeMode] = useState('flashcards');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      const savedProgress = await AsyncStorage.getItem('userProgress');

      if (savedLanguage) {
        setSelectedLanguage(JSON.parse(savedLanguage));
      }
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const languageProgress = progress[savedLanguage ? JSON.parse(savedLanguage).code : ''] || {};
        const learned = languageProgress.learnedWords || [];
        setLearnedWords(learned);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getLearnedWordsForLanguage = () => {
    if (!selectedLanguage) return [];
    
    const allWords = [];
    selectedLanguage.lessons.forEach(lesson => {
      lesson.words.forEach(word => {
        if (learnedWords.includes(word.word)) {
          allWords.push({ ...word, lessonTitle: lesson.title });
        }
      });
    });
    
    return allWords;
  };

  const nextWord = () => {
    const words = getLearnedWordsForLanguage();
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowTranslation(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
    }
  };

  const shuffleWords = () => {
    const words = getLearnedWordsForLanguage();
    if (words.length > 0) {
      setCurrentWordIndex(Math.floor(Math.random() * words.length));
      setShowTranslation(false);
    }
  };

  const renderFlashcard = () => {
    const words = getLearnedWordsForLanguage();
    
    if (words.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Icon name="school" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>Henüz öğrenilmiş kelime yok</Text>
          <Text style={styles.emptyStateSubtext}>
            Dersleri tamamlayarak kelime öğrenmeye başlayın
          </Text>
          <TouchableOpacity
            style={styles.startLearningButton}
            onPress={() => navigation.navigate('Lessons')}
          >
            <Text style={styles.startLearningButtonText}>Derslere Başla</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const currentWord = words[currentWordIndex];

    return (
      <View style={styles.flashcardContainer}>
        <View style={styles.flashcard}>
          <Text style={styles.wordText}>{currentWord.word}</Text>
          <Text style={styles.pronunciationText}>[{currentWord.pronunciation}]</Text>
          <Text style={styles.lessonText}>{currentWord.lessonTitle}</Text>
          
          <TouchableOpacity
            style={styles.translationButton}
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <Text style={styles.translationButtonText}>
              {showTranslation ? 'Çeviriyi Gizle' : 'Çeviriyi Göster'}
            </Text>
          </TouchableOpacity>
          
          {showTranslation && (
            <View style={styles.translationContainer}>
              <Text style={styles.translationText}>{currentWord.translation}</Text>
            </View>
          )}
        </View>

        <View style={styles.flashcardControls}>
          <TouchableOpacity
            style={[styles.controlButton, currentWordIndex === 0 && styles.disabledButton]}
            onPress={previousWord}
            disabled={currentWordIndex === 0}
          >
            <Icon name="chevron-left" size={24} color={currentWordIndex === 0 ? "#ccc" : "#4CAF50"} />
          </TouchableOpacity>
          
          <Text style={styles.wordCounter}>
            {currentWordIndex + 1} / {words.length}
          </Text>
          
          <TouchableOpacity
            style={[styles.controlButton, currentWordIndex === words.length - 1 && styles.disabledButton]}
            onPress={nextWord}
            disabled={currentWordIndex === words.length - 1}
          >
            <Icon name="chevron-right" size={24} color={currentWordIndex === words.length - 1 ? "#ccc" : "#4CAF50"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.shuffleButton}
          onPress={shuffleWords}
        >
          <Icon name="shuffle" size={20} color="white" />
          <Text style={styles.shuffleButtonText}>Karıştır</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWordList = () => {
    const words = getLearnedWordsForLanguage();
    
    if (words.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Icon name="list" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>Henüz öğrenilmiş kelime yok</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={words}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.wordListItem}>
            <View style={styles.wordInfo}>
              <Text style={styles.listWordText}>{item.word}</Text>
              <Text style={styles.listPronunciationText}>[{item.pronunciation}]</Text>
              <Text style={styles.listTranslationText}>{item.translation}</Text>
            </View>
            <View style={styles.wordMeta}>
              <Text style={styles.lessonLabel}>{item.lessonTitle}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.wordListContainer}
      />
    );
  };

  const renderStats = () => {
    const words = getLearnedWordsForLanguage();
    const totalLessons = selectedLanguage?.lessons.length || 0;
    const completedLessons = selectedLanguage?.lessons.filter(lesson => 
      lesson.words.some(word => learnedWords.includes(word.word))
    ).length || 0;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="translate" size={30} color="#4CAF50" />
          <Text style={styles.statNumber}>{words.length}</Text>
          <Text style={styles.statLabel}>Öğrenilen Kelime</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="school" size={30} color="#4CAF50" />
          <Text style={styles.statNumber}>{completedLessons}</Text>
          <Text style={styles.statLabel}>Aktif Ders</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="trending-up" size={30} color="#4CAF50" />
          <Text style={styles.statNumber}>{totalLessons}</Text>
          <Text style={styles.statLabel}>Toplam Ders</Text>
        </View>
      </View>
    );
  };

  if (!selectedLanguage) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noLanguageText}>Lütfen önce bir dil seçin</Text>
        <TouchableOpacity
          style={styles.goHomeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.goHomeButtonText}>Ana Sayfaya Git</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pratik</Text>
        <Text style={styles.headerSubtitle}>{selectedLanguage.name}</Text>
      </View>

      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, practiceMode === 'flashcards' && styles.activeModeButton]}
          onPress={() => setPracticeMode('flashcards')}
        >
          <Icon name="style" size={20} color={practiceMode === 'flashcards' ? 'white' : '#4CAF50'} />
          <Text style={[styles.modeButtonText, practiceMode === 'flashcards' && styles.activeModeButtonText]}>
            Kartlar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.modeButton, practiceMode === 'list' && styles.activeModeButton]}
          onPress={() => setPracticeMode('list')}
        >
          <Icon name="list" size={20} color={practiceMode === 'list' ? 'white' : '#4CAF50'} />
          <Text style={[styles.modeButtonText, practiceMode === 'list' && styles.activeModeButtonText]}>
            Liste
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.modeButton, practiceMode === 'stats' && styles.activeModeButton]}
          onPress={() => setPracticeMode('stats')}
        >
          <Icon name="analytics" size={20} color={practiceMode === 'stats' ? 'white' : '#4CAF50'} />
          <Text style={[styles.modeButtonText, practiceMode === 'stats' && styles.activeModeButtonText]}>
            İstatistikler
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {practiceMode === 'flashcards' && renderFlashcard()}
        {practiceMode === 'list' && renderWordList()}
        {practiceMode === 'stats' && renderStats()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noLanguageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  goHomeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  goHomeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  activeModeButton: {
    backgroundColor: '#4CAF50',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 5,
  },
  activeModeButtonText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  startLearningButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startLearningButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flashcardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  flashcard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pronunciationText: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  lessonText: {
    fontSize: 14,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 20,
  },
  translationButton: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  translationButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  translationContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  translationText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  flashcardControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  wordCounter: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  shuffleButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  shuffleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  wordListContainer: {
    paddingBottom: 20,
  },
  wordListItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordInfo: {
    marginBottom: 10,
  },
  listWordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  listPronunciationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  listTranslationText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  wordMeta: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  lessonLabel: {
    fontSize: 12,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PracticeScreen;