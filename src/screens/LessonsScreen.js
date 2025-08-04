import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LessonsScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userProgress, setUserProgress] = useState({});

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
        setUserProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const isLessonCompleted = (lessonId) => {
    if (!selectedLanguage || !userProgress[selectedLanguage.code]) {
      return false;
    }
    return userProgress[selectedLanguage.code].completedLessons?.includes(lessonId) || false;
  };

  const getLessonProgress = (lessonId) => {
    if (!selectedLanguage || !userProgress[selectedLanguage.code]) {
      return 0;
    }
    const lessonProgress = userProgress[selectedLanguage.code].lessonProgress?.[lessonId] || 0;
    return lessonProgress;
  };

  const renderLessonItem = ({ item }) => {
    const isCompleted = isLessonCompleted(item.id);
    const progress = getLessonProgress(item.id);

    return (
      <TouchableOpacity
        style={[styles.lessonCard, isCompleted && styles.completedLesson]}
        onPress={() => navigation.navigate('LessonDetail', { lesson: item, language: selectedLanguage })}
      >
        <View style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.lessonDescription}>{item.description}</Text>
            <View style={styles.lessonMeta}>
              <Text style={styles.lessonLevel}>{item.level}</Text>
              <Text style={styles.lessonDuration}>{item.duration}</Text>
            </View>
          </View>
          <View style={styles.lessonStatus}>
            {isCompleted ? (
              <Icon name="check-circle" size={30} color="#4CAF50" />
            ) : (
              <Icon name="play-circle-outline" size={30} color="#666" />
            )}
          </View>
        </View>
        
        {!isCompleted && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% tamamlandı</Text>
          </View>
        )}

        <View style={styles.lessonStats}>
          <Text style={styles.wordCount}>{item.words.length} kelime</Text>
          <Text style={styles.lessonType}>Ders</Text>
        </View>
      </TouchableOpacity>
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
        <Text style={styles.languageName}>{selectedLanguage.name}</Text>
        <Text style={styles.languageNative}>{selectedLanguage.nativeName}</Text>
        <Text style={styles.flag}>{selectedLanguage.flag}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {userProgress[selectedLanguage.code]?.completedLessons?.length || 0}
          </Text>
          <Text style={styles.statLabel}>Tamamlanan Ders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {userProgress[selectedLanguage.code]?.totalWords || 0}
          </Text>
          <Text style={styles.statLabel}>Öğrenilen Kelime</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {selectedLanguage.lessons.length}
          </Text>
          <Text style={styles.statLabel}>Toplam Ders</Text>
        </View>
      </View>

      <FlatList
        data={selectedLanguage.lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lessonsList}
        showsVerticalScrollIndicator={false}
      />
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
  languageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  languageNative: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 10,
  },
  flag: {
    fontSize: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  lessonsList: {
    padding: 15,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedLesson: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonLevel: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#888',
  },
  lessonStatus: {
    marginLeft: 10,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  lessonStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  wordCount: {
    fontSize: 14,
    color: '#666',
  },
  lessonType: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default LessonsScreen;