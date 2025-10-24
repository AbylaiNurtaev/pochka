import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
  const progressWidth = useSharedValue((step + 1) / totalSteps * 100);

  React.useEffect(() => {
    progressWidth.value = withTiming((step + 1) / totalSteps * 100, { duration: 300 });
  }, [step]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const getProgressText = () => {
    switch (language) {
      case 'kz':
        return `Қадам ${step + 1} ішінен ${totalSteps}`;
      case 'en':
        return `Step ${step + 1} of ${totalSteps}`;
      default:
        return `Шаг ${step + 1} из ${totalSteps}`;
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
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>{getProgressText()}</Text>
          <View style={styles.progressPercent}>
            <Text style={styles.progressPercentText}>
              {Math.round(((step + 1) / totalSteps) * 100)}%
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50, // Отступ для камеры времени
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
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
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercent: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  progressPercentText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A86B',
    borderRadius: 3,
  },
});
