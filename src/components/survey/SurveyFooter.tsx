import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SurveyFooterProps {
  onNext: () => void;
  canGoNext: boolean;
  isLastStep: boolean;
  nextText: string;
}

export const SurveyFooter: React.FC<SurveyFooterProps> = ({
  onNext,
  canGoNext,
  isLastStep,
  nextText
}) => {
  const scale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNext = () => {
    scale.value = withSpring(0.95, {}, () => { 
      scale.value = withSpring(1); 
    });
    onNext();
  };


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.nextButtonContainer, animatedButtonStyle]}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canGoNext && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <LinearGradient
            colors={!canGoNext ? ['#9ca3af', '#6b7280'] : ['#00A86B', '#008F5A', '#0284C7']}
            style={styles.nextButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[
              styles.nextButtonText,
              !canGoNext && styles.nextButtonTextDisabled
            ]}>
              {nextText}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#0a0a0a',
  },
  nextButtonContainer: {
    width: '100%',
  },
  nextButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.05,
  },
  nextButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  nextButtonTextDisabled: {
    color: '#d1d5db',
  },
});
