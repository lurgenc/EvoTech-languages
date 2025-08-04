import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import LessonsScreen from './screens/LessonsScreen';
import PracticeScreen from './screens/PracticeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import QuizScreen from './screens/QuizScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LessonsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="LessonsList" 
      component={LessonsScreen} 
      options={{ title: 'Dersler' }}
    />
    <Stack.Screen 
      name="LessonDetail" 
      component={LessonDetailScreen} 
      options={{ title: 'Ders Detayı' }}
    />
    <Stack.Screen 
      name="Quiz" 
      component={QuizScreen} 
      options={{ title: 'Quiz' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Lessons') {
              iconName = 'school';
            } else if (route.name === 'Practice') {
              iconName = 'fitness-center';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Ana Sayfa' }}
        />
        <Tab.Screen 
          name="Lessons" 
          component={LessonsStack} 
          options={{ title: 'Dersler', headerShown: false }}
        />
        <Tab.Screen 
          name="Practice" 
          component={PracticeScreen} 
          options={{ title: 'Pratik' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;