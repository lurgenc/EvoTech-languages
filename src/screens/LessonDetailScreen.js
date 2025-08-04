import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson, language } = route.params;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);
  const [showPronunciation, setShowPronunciation] = useState(false);

  useEffect(() => {
    loadLearnedWords();
  }, []);

  const loadLearnedWords = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const languageProgress = progress[language.code] || {};
        const learned = languageProgress.learnedWords || [];
        setLearnedWords(learned);
      }
    } catch (error) {
      console.error('Error loading learned words:', error);
    }
  };

  const markWordAsLearned = async (word) => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      let progress = savedProgress ? JSON.parse(savedProgress) : {};
      
      if (!progress[language.code]) {
        progress[language.code] = {};
      }
      
      if (!progress[language.code].learnedWords) {
        progress[language.code].learnedWords = [];
      }
      
      if (!progress[language.code].learnedWords.includes(word.word)) {
        progress[language.code].learnedWords.push(word.word);
        progress[language.code].totalWords = (progress[language.code].totalWords || 0) + 1;
      }
      
      await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
      setLearnedWords(progress[language.code].learnedWords);
    } catch (error) {
      console.error('Error saving word progress:', error);
    }
  };

  const completeLesson = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      let progress = savedProgress ? JSON.parse(savedProgress) : {};
      
      if (!progress[language.code]) {
        progress[language.code] = {};
      }
      
      if (!progress[language.code].completedLessons) {
        progress[language.code].completedLessons = [];
      }
      
      if (!progress[language.code].completedLessons.includes(lesson.id)) {
        progress[language.code].completedLessons.push(lesson.id);
      }
      
      await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
      
      Alert.alert(
        'Tebrikler!',
        'Dersi başarıyla tamamladınız!',
        [
          {
            text: 'Quiz\'e Geç',
            onPress: () => navigation.navigate('Quiz', { lesson, language }),
          },
          {
            text: 'Derslere Dön',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < lesson.words.length - 1) {
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

  const currentWord = lesson.words[currentWordIndex];
  const isWordLearned = learnedWords.includes(currentWord.word);
  const progress = ((currentWordIndex + 1) / lesson.words.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.progressText}>
          {currentWordIndex + 1} / {lesson.words.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.wordCard}>
          <View style={styles.wordHeader}>
            <Text style={styles.wordText}>{currentWord.word}</Text>
            <TouchableOpacity
              style={styles.pronunciationButton}
              onPress={() => setShowPronunciation(true)}
            >
              <Icon name="volume-up" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.pronunciationText}>[{currentWord.pronunciation}]</Text>
          
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
          
          <TouchableOpacity
            style={[
              styles.learnButton,
              isWordLearned && styles.learnedButton
            ]}
            onPress={() => markWordAsLearned(currentWord)}
          >
            <Icon 
              name={isWordLearned ? "check-circle" : "add-circle-outline"} 
              size={20} 
              color={isWordLearned ? "white" : "#4CAF50"} 
            />
            <Text style={[
              styles.learnButtonText,
              isWordLearned && styles.learnedButtonText
            ]}>
              {isWordLearned ? 'Öğrenildi' : 'Öğrenildi Olarak İşaretle'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentWordIndex === 0 && styles.disabledButton]}
            onPress={previousWord}
            disabled={currentWordIndex === 0}
          >
            <Icon name="chevron-left" size={24} color={currentWordIndex === 0 ? "#ccc" : "#4CAF50"} />
            <Text style={[styles.navButtonText, currentWordIndex === 0 && styles.disabledButtonText]}>
              Önceki
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, currentWordIndex === lesson.words.length - 1 && styles.disabledButton]}
            onPress={nextWord}
            disabled={currentWordIndex === lesson.words.length - 1}
          >
            <Text style={[styles.navButtonText, currentWordIndex === lesson.words.length - 1 && styles.disabledButtonText]}>
              Sonraki
            </Text>
            <Icon name="chevron-right" size={24} color={currentWordIndex === lesson.words.length - 1 ? "#ccc" : "#4CAF50"} />
          </TouchableOpacity>
        </View>

        <View style={styles.lessonInfo}>
          <Text style={styles.infoTitle}>Ders Bilgileri</Text>
          <Text style={styles.infoText}>Seviye: {lesson.level}</Text>
          <Text style={styles.infoText}>Süre: {lesson.duration}</Text>
          <Text style={styles.infoText}>Toplam Kelime: {lesson.words.length}</Text>
          <Text style={styles.infoText}>Öğrenilen: {learnedWords.filter(word => lesson.words.some(w => w.word === word)).length}</Text>
        </View>

        {currentWordIndex === lesson.words.length - 1 && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={completeLesson}
          >
            <Text style={styles.completeButtonText}>Dersi Tamamla</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        visible={showPronunciation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPronunciation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pronunciationModal}>
            <Text style={styles.modalTitle}>Telaffuz</Text>
            <Text style={styles.modalWord}>{currentWord.word}</Text>
            <Text style={styles.modalPronunciation}>[{currentWord.pronunciation}]</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPronunciation(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  wordCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  pronunciationButton: {
    padding: 10,
  },
  pronunciationText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  translationButton: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
    marginBottom: 20,
  },
  translationText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  learnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  learnedButton: {
    backgroundColor: '#4CAF50',
  },
  learnButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  learnedButtonText: {
    color: 'white',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  navButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  disabledButtonText: {
    color: '#ccc',
  },
  lessonInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pronunciationModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalPronunciation: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LessonDetailScreen;