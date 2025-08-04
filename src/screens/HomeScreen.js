import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllLanguages } from '../data/languages';

const HomeScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [streak, setStreak] = useState(0);
  const languages = getAllLanguages();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      const savedProgress = await AsyncStorage.getItem('userProgress');
      const savedStreak = await AsyncStorage.getItem('streak');

      if (savedLanguage) {
        setSelectedLanguage(JSON.parse(savedLanguage));
      }
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
      if (savedStreak) {
        setStreak(JSON.parse(savedStreak));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const selectLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', JSON.stringify(language));
      setSelectedLanguage(language);
      Alert.alert('Başarılı!', `${language.name} dili seçildi.`);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const getProgressForLanguage = (languageCode) => {
    return userProgress[languageCode] || { completedLessons: 0, totalWords: 0 };
  };

  const renderLanguageCard = (language) => {
    const progress = getProgressForLanguage(language.code);
    const isSelected = selectedLanguage?.code === language.code;

    return (
      <TouchableOpacity
        key={language.code}
        style={[styles.languageCard, isSelected && styles.selectedCard]}
        onPress={() => selectLanguage(language)}
      >
        <Text style={styles.languageFlag}>{language.flag}</Text>
        <Text style={styles.languageName}>{language.name}</Text>
        <Text style={styles.languageNative}>{language.nativeName}</Text>
        <Text style={styles.progressText}>
          {progress.completedLessons} ders tamamlandı
        </Text>
        <Text style={styles.progressText}>
          {progress.totalWords} kelime öğrenildi
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Praktika Clone</Text>
        <Text style={styles.subtitle}>Ücretsiz Dil Öğrenme Uygulaması</Text>
      </View>

      {selectedLanguage && (
        <View style={styles.selectedLanguageSection}>
          <Text style={styles.sectionTitle}>Seçili Dil</Text>
          <View style={styles.selectedLanguageCard}>
            <Text style={styles.selectedLanguageFlag}>{selectedLanguage.flag}</Text>
            <Text style={styles.selectedLanguageName}>{selectedLanguage.name}</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('Lessons')}
            >
              <Text style={styles.startButtonText}>Derslere Başla</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>İstatistikler</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Object.values(userProgress).reduce((total, progress) => total + progress.completedLessons, 0)}
            </Text>
            <Text style={styles.statLabel}>Toplam Ders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Object.values(userProgress).reduce((total, progress) => total + progress.totalWords, 0)}
            </Text>
            <Text style={styles.statLabel}>Toplam Kelime</Text>
          </View>
        </View>
      </View>

      <View style={styles.languagesSection}>
        <Text style={styles.sectionTitle}>Dil Seçin</Text>
        <View style={styles.languagesGrid}>
          {languages.map(renderLanguageCard)}
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Özellikler</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🎯</Text>
          <Text style={styles.featureText}>Tamamen Ücretsiz</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📚</Text>
          <Text style={styles.featureText}>Kapsamlı Dersler</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🎧</Text>
          <Text style={styles.featureText}>Telaffuz Desteği</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🏆</Text>
          <Text style={styles.featureText}>İlerleme Takibi</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🇧🇬</Text>
          <Text style={styles.featureText}>Bulgarca Desteği</Text>
        </View>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  selectedLanguageSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  selectedLanguageCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedLanguageFlag: {
    fontSize: 40,
    marginBottom: 10,
  },
  selectedLanguageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
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
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  languagesSection: {
    padding: 20,
  },
  languagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  languageFlag: {
    fontSize: 30,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  languageNative: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
    paddingBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;