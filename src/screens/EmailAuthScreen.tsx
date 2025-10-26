import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'EmailAuth'>;

export default function EmailAuthScreen({ navigation }: Props) {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  
  const nextButtonScale = useSharedValue(1);

  const animatedNextButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextButtonScale.value }],
  }));

  const handleNext = () => {
    nextButtonScale.value = withSpring(0.95, {}, () => {
      nextButtonScale.value = withSpring(1);
    });

    // TODO: Здесь будет логика отправки кода на email
    console.log('Email:', email);
  };

  const getTitle = () => {
    switch (language) {
      case 'kz':
        return 'Электрондық пошта арқылы кіру';
      case 'en':
        return 'Login by email';
      default:
        return 'Вход по электронной почте';
    }
  };

  const getEmailPlaceholder = () => {
    switch (language) {
      case 'kz':
        return 'Электрондық пошта';
      case 'en':
        return 'Email';
      default:
        return 'Электронная почта';
    }
  };

  const getNextButtonText = () => {
    switch (language) {
      case 'kz':
        return 'Әрі қарай';
      case 'en':
        return 'Next';
      default:
        return 'Дальше';
    }
  };

  const getPasswordLinkText = () => {
    switch (language) {
      case 'kz':
        return 'Құпия сөзбен кіру';
      case 'en':
        return 'Login with password';
      default:
        return 'Войти по паролю';
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      {/* Header with back and close buttons */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.navigate('Welcome')}
        >
          <Icon name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{getTitle()}</Text>

        {/* Email Input */}
        <TextInput
          style={styles.emailInput}
          placeholder={getEmailPlaceholder()}
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Next Button */}
        <Animated.View style={[styles.nextButtonContainer, animatedNextButtonStyle]}>
          <Pressable 
            style={[
              styles.nextButton,
              isValidEmail(email) && styles.nextButtonActive
            ]} 
            onPress={handleNext}
            disabled={!isValidEmail(email)}
          >
            <Text style={styles.nextButtonText}>{getNextButtonText()}</Text>
          </Pressable>
        </Animated.View>

        {/* Password Link */}
        <Pressable onPress={() => console.log('Login with password')}>
          <Text style={styles.passwordLink}>{getPasswordLinkText()}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  emailInput: {
    backgroundColor: '#27343a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginBottom: 32,
  },
  nextButtonContainer: {
    marginBottom: 24,
  },
  nextButton: {
    backgroundColor: '#4B5563',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#3B82F6',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  passwordLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    textAlign: 'center',
  },
});

