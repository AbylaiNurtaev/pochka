import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface LoginPromptProps {
  text: string;
  buttonText: string;
  onLogin: () => void;
}

// Задаем максимальную ширину 90% от экрана, но не более 380 (для лучшей адаптивности)
const { width } = Dimensions.get('window');
const CONTENT_MAX_WIDTH = Math.min(width * 0.9, 380); 

export const LoginPrompt: React.FC<LoginPromptProps> = ({
  text,
  buttonText,
  onLogin
}) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(400)} 
      exiting={FadeOut.duration(200)} 
      style={styles.container}
    >
      <View style={[styles.content, { width: CONTENT_MAX_WIDTH }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👤</Text>
        </View>
        
        <Text style={styles.title}>{text}</Text>
        
        <Text style={styles.subtitle}>
          Быстрый доступ к вашим данным и истории
        </Text>
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={onLogin}
        >
          <LinearGradient
            colors={['#00A86B', '#008F5A', '#0284C7']}
            style={styles.loginButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.loginButtonText}>{buttonText}</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>или</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <Text style={styles.continueText}>
          Продолжить как новый пользователь
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Убираем padding, чтобы дочерний элемент сам управлял шириной
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    // Ширина теперь задана через Dimensions
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginButton: {
    width: '100%', // Теперь 100% от CONTENT_MAX_WIDTH
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  continueText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});