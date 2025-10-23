import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type PrivacyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Privacy'>;

interface Props {
  navigation: PrivacyScreenNavigationProp;
}

const PrivacyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Политика конфиденциальности</Text>
        
        <Text style={styles.sectionTitle}>Сбор информации</Text>
        <Text style={styles.text}>
          Мы собираем только необходимую информацию для предоставления наших услуг.
        </Text>
        
        <Text style={styles.sectionTitle}>Использование данных</Text>
        <Text style={styles.text}>
          Ваши данные используются исключительно для улучшения качества наших услуг.
        </Text>
        
        <Text style={styles.sectionTitle}>Защита данных</Text>
        <Text style={styles.text}>
          Мы применяем современные методы защиты ваших персональных данных.
        </Text>
        
        <Text style={styles.sectionTitle}>Контакты</Text>
        <Text style={styles.text}>
          По вопросам конфиденциальности обращайтесь к нам по электронной почте.
        </Text>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrivacyScreen;
