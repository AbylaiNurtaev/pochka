// SurveyHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// Убираем импорты Animated отсюда, так как вся анимация инкапсулирована
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// Импортируем наш новый компонент
import { KidneyProgressBar } from './KidneyProgressBar'; // Укажите правильный путь

const { width: screenWidth } = Dimensions.get('window');

interface SurveyHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  language: 'ru' | 'kz' | 'en';
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  step,
  totalSteps,
  onBack,
  canGoBack,
  language
}) => {
  // Рассчитываем прогресс как значение от 0 до 1
  const progressValue = totalSteps > 0 ? step / totalSteps : 0;

  const getProgressText = () => {
    switch (language) {
      case 'kz':
        return `Қадам ${step} ішінен ${totalSteps}`;
      case 'en':
        return `Step ${step} of ${totalSteps}`;
      default:
        return `Шаг ${step} из ${totalSteps}`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, !canGoBack && styles.backButtonDisabled]} 
          onPress={onBack} 
          disabled={!canGoBack}
        >
          <Text style={[styles.backButtonText, !canGoBack && styles.backButtonTextDisabled]}>
            ← {language === 'kz' ? 'Артқа' : language === 'en' ? 'Back' : 'Назад'}
          </Text>
        </TouchableOpacity>
        
        {/* Оборачиваем почку и текст в контейнер для центрирования */}
        <View style={styles.progressContainer}>
          <KidneyProgressBar progress={progressValue} />
          <Text style={styles.progressText}>{getProgressText()}</Text>
        </View>
        
        {/* Пустой View для выравнивания, если кнопка "Назад" занимает место */}
        <View style={{width: 80}} />
      </View>
      
      {/* СТАРЫЙ ПРОГРЕСС-БАР УДАЛЕН */}
    </View>
  );
};

// Стили немного изменены для новой верстки
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#0a0a0a',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  progressContainer: { // Новый стиль для центрирования
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginTop: 5,
  },
  backButtonDisabled: {
    opacity: 0.4,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  backButtonTextDisabled: {
    opacity: 0.6,
  },
  progressText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  // Старые стили progressBar и progressFill больше не нужны
});