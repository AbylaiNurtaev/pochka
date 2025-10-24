import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SurveyData, SurveyTexts } from './types';
import { computeBmi, computeBsa, bmiCategory } from './utils';

interface SurveyStepProps {
  step: number;
  data: SurveyData;
  setData: (data: SurveyData) => void;
  text: SurveyTexts;
  language: 'ru' | 'kz' | 'en';
  touched: Record<number, boolean>;
  isStepOptional: (step: number) => boolean;
  isStepValid: (step: number) => boolean;
}

export const SurveyStep: React.FC<SurveyStepProps> = ({
  step,
  data,
  setData,
  text,
  language,
  touched,
  isStepOptional,
  isStepValid
}) => {
  const renderStepContent = () => {
    switch (step) {
      case 1: // Имя
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.name}</Text>
            <TextInput
              style={[
                styles.input,
                !isStepOptional(1) && touched[1] && !isStepValid(1) && styles.inputError
              ]}
              placeholder={text.placeholders.name}
              value={data.name || ''}
              onChangeText={(text) => setData({ ...data, name: text })}
              placeholderTextColor="#9ca3af"
            />
            {!isStepOptional(1) && touched[1] && !isStepValid(1) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Атыңызды енгізіңіз (кемінде 2 символ)' : 'Пожалуйста, введите имя (минимум 2 символа)'}
              </Text>
            )}
          </Animated.View>
        );

      case 2: // Дата рождения
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.dob}</Text>
            <TextInput
              style={[
                styles.input,
                !isStepOptional(2) && touched[2] && !isStepValid(2) && styles.inputError
              ]}
              placeholder={text.placeholders.dob}
              value={data.birthDate || ''}
              onChangeText={(text) => setData({ ...data, birthDate: text })}
              placeholderTextColor="#9ca3af"
            />
            {!isStepOptional(2) && touched[2] && !isStepValid(2) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Туған күніңізді көрсетіңіз' : 'Укажите дату рождения'}
              </Text>
            )}
          </Animated.View>
        );

      case 3: // Пол
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.gender}</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  data.gender === 'male' && styles.genderButtonActive
                ]}
                onPress={() => setData({ ...data, gender: 'male' })}
              >
                <Text style={[
                  styles.genderButtonText,
                  data.gender === 'male' && styles.genderButtonTextActive
                ]}>
                  {text.gender.male}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  data.gender === 'female' && styles.genderButtonActive
                ]}
                onPress={() => setData({ ...data, gender: 'female' })}
              >
                <Text style={[
                  styles.genderButtonText,
                  data.gender === 'female' && styles.genderButtonTextActive
                ]}>
                  {text.gender.female}
                </Text>
              </TouchableOpacity>
            </View>
            {!isStepOptional(3) && touched[3] && !isStepValid(3) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Бір нұсқаны таңдаңыз' : 'Выберите один вариант'}
              </Text>
            )}
          </Animated.View>
        );

      case 4: // Рост
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.height}</Text>
            <TextInput
              style={[
                styles.input,
                !isStepOptional(4) && touched[4] && !isStepValid(4) && styles.inputError
              ]}
              placeholder={text.placeholders.height}
              value={data.heightCm?.toString() || ''}
              onChangeText={(text) => setData({ ...data, heightCm: text ? parseInt(text.replace(/\D/g, ''), 10) : undefined })}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
            {!isStepOptional(4) && touched[4] && !isStepValid(4) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Бойыңызды 40-250 см аралығында енгізіңіз' : 'Введите рост от 40 до 250 см'}
              </Text>
            )}
          </Animated.View>
        );

      case 5: // Вес
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.weight}</Text>
            <TextInput
              style={[
                styles.input,
                !isStepOptional(5) && touched[5] && !isStepValid(5) && styles.inputError
              ]}
              placeholder={text.placeholders.weight}
              value={data.weightKg?.toString() || ''}
              onChangeText={(text) => setData({ ...data, weightKg: text ? parseInt(text.replace(/\D/g, ''), 10) : undefined })}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
            {!isStepOptional(5) && touched[5] && !isStepValid(5) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Салмағыңызды 10-400 кг аралығында енгізіңіз' : 'Введите вес от 10 до 400 кг'}
              </Text>
            )}
          </Animated.View>
        );

      case 6: // BMI результат
        const bmi = computeBmi(data.heightCm, data.weightKg);
        const bsa = computeBsa(data.heightCm, data.weightKg);
        const bmiStatus = bmiCategory(bmi, language);
        
        return (
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(200)}>
            <Text style={styles.stepTitle}>{text.steps.bmiResult}</Text>
            <View style={styles.bmiContainer}>
              <View style={styles.bmiResult}>
                <Text style={styles.bmiValue}>{bmi ?? '—'}</Text>
                <Text style={styles.bmiStatus}>{bmiStatus}</Text>
              </View>
              
              <View style={styles.bsaContainer}>
                <Text style={styles.bsaTitle}>
                  {language === 'kz' ? 'Дене бетінің ауданы (ППТ)' : 'Площадь поверхности тела (ППТ)'}
                </Text>
                <Text style={styles.bsaValue}>
                  {bsa ? `${bsa} м²` : '—'}
                </Text>
              </View>
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStepContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  genderButtonTextActive: {
    color: '#ffffff',
  },
  bmiContainer: {
    alignItems: 'center',
    gap: 20,
  },
  bmiResult: {
    alignItems: 'center',
    gap: 8,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1f2937',
  },
  bmiStatus: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6b7280',
  },
  bsaContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    width: '100%',
  },
  bsaTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  bsaValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3b82f6',
  },
});
