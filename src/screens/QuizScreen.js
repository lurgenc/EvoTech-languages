import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuizScreen = ({ route, navigation }) => {
  const { lesson, language } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const quizQuestions = [];
    const words = lesson.words;

    // Multiple choice questions
    words.forEach((word, index) => {
      const otherWords = words.filter((_, i) => i !== index);
      const wrongAnswers = otherWords
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.translation);

      const correctAnswer = word.translation;
      const allAnswers = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());

      quizQuestions.push({
        type: 'multiple_choice',
        question: `"${word.word}" kelimesinin Türkçe karşılığı nedir?`,
        correctAnswer: correctAnswer,
        options: allAnswers,
        word: word,
      });
    });

    // Translation questions
    words.forEach((word, index) => {
      const otherWords = words.filter((_, i) => i !== index);
      const wrongAnswers = otherWords
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.word);

      const correctAnswer = word.word;
      const allAnswers = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());

      quizQuestions.push({
        type: 'translation',
        question: `"${word.translation}" kelimesinin ${language.name} karşılığı nedir?`,
        correctAnswer: correctAnswer,
        options: allAnswers,
        word: word,
      });
    });

    // Shuffle questions
    setQuestions(quizQuestions.sort(() => 0.5 - Math.random()).slice(0, 10));
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        saveQuizResult();
      }
    }, 1500);
  };

  const saveQuizResult = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      let progress = savedProgress ? JSON.parse(savedProgress) : {};
      
      if (!progress[language.code]) {
        progress[language.code] = {};
      }
      
      if (!progress[language.code].quizResults) {
        progress[language.code].quizResults = [];
      }
      
      const quizResult = {
        lessonId: lesson.id,
        score: score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        date: new Date().toISOString(),
      };
      
      progress[language.code].quizResults.push(quizResult);
      
      // Update lesson progress
      if (!progress[language.code].lessonProgress) {
        progress[language.code].lessonProgress = {};
      }
      
      const lessonProgress = Math.round((score / questions.length) * 100);
      progress[language.code].lessonProgress[lesson.id] = lessonProgress;
      
      await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const getAnswerStyle = (answer) => {
    if (selectedAnswer === null) return styles.answerButton;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.correctAnswer];
    } else if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.wrongAnswer];
    }
    return styles.answerButton;
  };

  const getAnswerIcon = (answer) => {
    if (selectedAnswer === null) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      return <Icon name="check-circle" size={20} color="white" style={styles.answerIcon} />;
    } else if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
      return <Icon name="cancel" size={20} color="white" style={styles.answerIcon} />;
    }
    return null;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Quiz hazırlanıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.quizTitle}>Quiz: {lesson.title}</Text>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Skor: {score}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
          
          {currentQuestion?.word && (
            <View style={styles.wordInfo}>
              <Text style={styles.wordText}>{currentQuestion.word.word}</Text>
              <Text style={styles.pronunciationText}>[{currentQuestion.word.pronunciation}]</Text>
            </View>
          )}
        </View>

        <View style={styles.answersContainer}>
          {currentQuestion?.options.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={getAnswerStyle(answer)}
              onPress={() => handleAnswerSelect(answer)}
              disabled={selectedAnswer !== null}
            >
              {getAnswerIcon(answer)}
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedAnswer !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={[
              styles.feedbackText,
              isCorrect ? styles.correctFeedback : styles.wrongFeedback
            ]}>
              {isCorrect ? 'Doğru!' : 'Yanlış!'}
            </Text>
            <Text style={styles.correctAnswerText}>
              Doğru cevap: {currentQuestion.correctAnswer}
            </Text>
          </View>
        )}
      </View>

      <Modal
        visible={showResult}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultModal}>
            <Text style={styles.resultTitle}>Quiz Tamamlandı!</Text>
            
            <View style={styles.resultStats}>
              <View style={styles.resultStat}>
                <Text style={styles.resultNumber}>{score}</Text>
                <Text style={styles.resultLabel}>Doğru Cevap</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={styles.resultNumber}>{questions.length - score}</Text>
                <Text style={styles.resultLabel}>Yanlış Cevap</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={styles.resultNumber}>{Math.round((score / questions.length) * 100)}%</Text>
                <Text style={styles.resultLabel}>Başarı Oranı</Text>
              </View>
            </View>

            <View style={styles.resultMessage}>
              {score === questions.length && (
                <Text style={styles.perfectText}>Mükemmel! Tüm soruları doğru cevapladınız! 🎉</Text>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <Text style={styles.goodText}>Harika! Çok iyi bir performans gösterdiniz! 👏</Text>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <Text style={styles.okText}>İyi! Biraz daha pratik yapabilirsiniz. 💪</Text>
              )}
              {score < questions.length * 0.6 && (
                <Text style={styles.needPracticeText}>Daha fazla pratik yapmanız gerekiyor. 📚</Text>
              )}
            </View>

            <View style={styles.resultButtons}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setShowResult(false);
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setIsCorrect(null);
                  generateQuestions();
                }}
              >
                <Text style={styles.retryButtonText}>Tekrar Dene</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate('LessonsList')}
              >
                <Text style={styles.continueButtonText}>Derslere Dön</Text>
              </TouchableOpacity>
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  quizTitle: {
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
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  scoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
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
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  wordInfo: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  pronunciationText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#f44336',
  },
  answerIcon: {
    marginRight: 10,
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  correctFeedback: {
    color: '#4CAF50',
  },
  wrongFeedback: {
    color: '#f44336',
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    margin: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  resultStat: {
    alignItems: 'center',
  },
  resultNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  resultLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  resultMessage: {
    marginBottom: 20,
    alignItems: 'center',
  },
  perfectText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goodText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  okText: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  needPracticeText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  retryButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.48,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.48,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen;