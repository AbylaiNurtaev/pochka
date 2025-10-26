import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { Language } from '../../contexts/LanguageContext';

interface KidneyGenerationProps {
  onComplete: () => void;
  language: Language; // 'ru' | 'kz' | 'en'
}

export default function KidneyGeneration({ onComplete, language }: KidneyGenerationProps) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Начальная анимация появления почки
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 500 });
    
    // Анимация вращения
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 2000, 
        easing: Easing.linear 
      }),
      -1,
      false
    );

    // Появление текста
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 500 });
    }, 300);

    // Переход на страницу регистрации через 3 секунды
    setTimeout(() => {
      onComplete();
    }, 3000);
  }, []);

  const kidneyStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const text1Style = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const text2Style = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.kidney, kidneyStyle]}>
        🫘
      </Animated.Text>
      
      <Animated.View style={[styles.textContainer, text1Style]}>
        <Text style={styles.mainText}>
          {language === 'kz' ? 'Сіздің бүйрегіңіз' : language === 'ru' ? 'Ваша почка' : 'Your kidney'}
        </Text>
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, text2Style]}>
        <Text style={styles.subText}>
          {language === 'kz' ? 'жасалып жатыр' : language === 'ru' ? 'генерируется' : 'is generating'}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1c23',
  },
  kidney: {
    fontSize: 120,
    marginBottom: 40,
  },
  textContainer: {
    marginVertical: 8,
  },
  mainText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#06a8f9',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

