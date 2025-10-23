import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type SurveyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Survey'>;

interface Props {
  navigation: SurveyScreenNavigationProp;
}

const SurveyScreen: React.FC<Props> = ({ navigation }) => {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
  });

  const questions = [
    {
      id: 'question1',
      text: 'Какой ваш любимый цвет?',
      options: ['Красный', 'Синий', 'Зеленый', 'Желтый'],
    },
    {
      id: 'question2',
      text: 'Какой ваш любимый жанр музыки?',
      options: ['Рок', 'Поп', 'Классика', 'Джаз'],
    },
    {
      id: 'question3',
      text: 'Какой ваш любимый вид спорта?',
      options: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание'],
    },
  ];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    if (!allAnswered) {
      alert('Пожалуйста, ответьте на все вопросы');
      return;
    }
    
    // Здесь будет логика отправки ответов
    alert('Опрос завершен! Спасибо за участие.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Опрос</Text>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {questions.map((question, index) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {index + 1}. {question.text}
            </Text>
            
            {question.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  answers[question.id as keyof typeof answers] === option && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(question.id, option)}
              >
                <Text style={[
                  styles.optionText,
                  answers[question.id as keyof typeof answers] === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Завершить опрос</Text>
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
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SurveyScreen;
