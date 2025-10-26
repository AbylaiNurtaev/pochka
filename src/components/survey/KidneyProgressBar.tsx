// KidneyProgressBar.tsx (Версия для PNG)
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Импортируем PNG-файлы (ваши пути могут отличаться)
const KidneyEmpty = require('../../../assets/human-kidney-bad.png');
const KidneyFilled = require('../../../assets/human-kidney.png');

const KIDNEY_HEIGHT = 120; 
const KIDNEY_WIDTH = 100;  

interface KidneyProgressBarProps {
  progress: number; // Значение от 0 до 1
}

export const KidneyProgressBar: React.FC<KidneyProgressBarProps> = ({ progress }) => {
  const fillHeight = useSharedValue(0);

  useEffect(() => {
    fillHeight.value = withTiming(progress * KIDNEY_HEIGHT, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
  }, [progress]);

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      // Анимируем высоту контейнера
      height: fillHeight.value, 
    };
  });

  return (
    <View style={styles.container}>
      {/* Слой 1: Пустая почка (фон) */}
      <Image 
        source={KidneyEmpty} 
        style={styles.imageBackground}
      />

      {/* Слой 2: Контейнер-маска (Animated.View) */}
      <Animated.View style={[styles.fillContainer, animatedFillStyle]}>
        {/* Внутри маски находится полностью заполненная почка */}
        <Image 
          source={KidneyFilled} 
          style={styles.imageForeground}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: KIDNEY_WIDTH,
    height: KIDNEY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    // Стиль для фонового изображения
    width: KIDNEY_WIDTH,
    height: KIDNEY_HEIGHT,
    position: 'absolute',
    resizeMode: 'contain', // Важно для PNG!
  },
  fillContainer: {
    width: KIDNEY_WIDTH,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden', // Ключевой момент для маски
  },
  imageForeground: {
    // Стиль для заполняющего изображения
    width: KIDNEY_WIDTH,
    height: KIDNEY_HEIGHT,
    position: 'absolute', // Абсолютно позиционируем, чтобы оно начиналось снизу
    bottom: 0,
    resizeMode: 'contain', // Важно для PNG!
  },
});