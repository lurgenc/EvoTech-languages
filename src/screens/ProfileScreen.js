import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAllLanguages } from '../data/languages';

const ProfileScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    darkMode: false,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      const savedProgress = await AsyncStorage.getItem('userProgress');
      const savedStreak = await AsyncStorage.getItem('streak');
      const savedSettings = await AsyncStorage.getItem('settings');

      if (savedLanguage) {
        setSelectedLanguage(JSON.parse(savedLanguage));
      }
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
      if (savedStreak) {
        setStreak(JSON.parse(savedStreak));
      }
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const resetProgress = async () => {
    Alert.alert(
      'İlerlemeyi Sıfırla',
      'Tüm ilerlemeniz silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userProgress');
              await AsyncStorage.removeItem('streak');
              setUserProgress({});
              setStreak(0);
              Alert.alert('Başarılı', 'İlerlemeniz sıfırlandı.');
            } catch (error) {
              console.error('Error resetting progress:', error);
            }
          },
        },
      ]
    );
  };

  const getTotalStats = () => {
    const totalLessons = Object.values(userProgress).reduce((total, progress) => {
      return total + (progress.completedLessons?.length || 0);
    }, 0);

    const totalWords = Object.values(userProgress).reduce((total, progress) => {
      return total + (progress.totalWords || 0);
    }, 0);

    const totalQuizzes = Object.values(userProgress).reduce((total, progress) => {
      return total + (progress.quizResults?.length || 0);
    }, 0);

    return { totalLessons, totalWords, totalQuizzes };
  };

  const getLanguageStats = () => {
    const languages = getAllLanguages();
    return languages.map(language => {
      const progress = userProgress[language.code] || {};
      return {
        language,
        completedLessons: progress.completedLessons?.length || 0,
        totalWords: progress.totalWords || 0,
        quizResults: progress.quizResults || [],
      };
    }).filter(stat => stat.completedLessons > 0 || stat.totalWords > 0);
  };

  const renderLanguageProgress = () => {
    const languageStats = getLanguageStats();
    
    if (languageStats.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Icon name="school" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>Henüz hiçbir dilde ilerleme yok</Text>
          <Text style={styles.emptyStateSubtext}>
            Dersleri tamamlayarak ilerleme kaydetmeye başlayın
          </Text>
        </View>
      );
    }

    return languageStats.map((stat, index) => (
      <View key={index} style={styles.languageProgressCard}>
        <View style={styles.languageHeader}>
          <Text style={styles.languageFlag}>{stat.language.flag}</Text>
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>{stat.language.name}</Text>
            <Text style={styles.languageNative}>{stat.language.nativeName}</Text>
          </View>
        </View>
        
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{stat.completedLessons}</Text>
            <Text style={styles.progressLabel}>Ders</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{stat.totalWords}</Text>
            <Text style={styles.progressLabel}>Kelime</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>{stat.quizResults.length}</Text>
            <Text style={styles.progressLabel}>Quiz</Text>
          </View>
        </View>
      </View>
    ));
  };

  const totalStats = getTotalStats();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <Text style={styles.headerSubtitle}>Öğrenme İstatistikleriniz</Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Genel İstatistikler</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="local-fire-department" size={30} color="#FF6B35" />
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="school" size={30} color="#4CAF50" />
            <Text style={styles.statNumber}>{totalStats.totalLessons}</Text>
            <Text style={styles.statLabel}>Tamamlanan Ders</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="translate" size={30} color="#2196F3" />
            <Text style={styles.statNumber}>{totalStats.totalWords}</Text>
            <Text style={styles.statLabel}>Öğrenilen Kelime</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="quiz" size={30} color="#9C27B0" />
            <Text style={styles.statNumber}>{totalStats.totalQuizzes}</Text>
            <Text style={styles.statLabel}>Tamamlanan Quiz</Text>
          </View>
        </View>
      </View>

      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>Dil İlerlemeleri</Text>
        {renderLanguageProgress()}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Ayarlar</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="notifications" size={24} color="#666" />
            <Text style={styles.settingText}>Bildirimler</Text>
          </View>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="volume-up" size={24} color="#666" />
            <Text style={styles.settingText}>Ses Efektleri</Text>
          </View>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => updateSetting('soundEnabled', value)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.soundEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="dark-mode" size={24} color="#666" />
            <Text style={styles.settingText}>Karanlık Mod</Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => updateSetting('darkMode', value)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Eylemler</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="language" size={24} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Dil Değiştir</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Lessons')}
        >
          <Icon name="school" size={24} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Derslere Git</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Practice')}
        >
          <Icon name="fitness-center" size={24} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Pratik Yap</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={resetProgress}
        >
          <Icon name="delete-forever" size={24} color="#f44336" />
          <Text style={[styles.actionButtonText, styles.dangerText]}>İlerlemeyi Sıfırla</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>Hakkında</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.appName}>Praktika Clone</Text>
          <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
          <Text style={styles.appDescription}>
            Tamamen ücretsiz dil öğrenme uygulaması. 
            Bulgarca dahil 9 farklı dil desteği ile 
            kelime öğrenmeyi kolaylaştırır.
          </Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✓ Tamamen Ücretsiz</Text>
            <Text style={styles.featureItem}>✓ Bulgarca Desteği</Text>
            <Text style={styles.featureItem}>✓ Telaffuz Desteği</Text>
            <Text style={styles.featureItem}>✓ İnteraktif Quizler</Text>
            <Text style={styles.featureItem}>✓ İlerleme Takibi</Text>
          </View>
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
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
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
  languageSection: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  languageProgressCard: {
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
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  languageFlag: {
    fontSize: 30,
    marginRight: 15,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  languageNative: {
    fontSize: 14,
    color: '#666',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  settingsSection: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  actionsSection: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dangerButton: {
    borderColor: '#f44336',
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  dangerText: {
    color: '#f44336',
  },
  aboutSection: {
    padding: 20,
    paddingBottom: 40,
  },
  aboutCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  featuresList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  featureItem: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
});

export default ProfileScreen;