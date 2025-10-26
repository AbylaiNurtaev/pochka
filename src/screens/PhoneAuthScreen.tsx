import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneAuth'>;

export default function PhoneAuthScreen({ navigation }: Props) {
  const { language } = useLanguage();
  const [phone, setPhone] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const codeInputRefs = useRef<Array<TextInput | null>>([]);
  
  const nextButtonScale = useSharedValue(1);

  const animatedNextButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextButtonScale.value }],
  }));

  const handleNext = () => {
    nextButtonScale.value = withSpring(0.95, {}, () => {
      nextButtonScale.value = withSpring(1);
    });

    if (!showCodeInput) {
      // Показываем экран ввода кода
      setShowCodeInput(true);
    } else {
      // Проверяем код и переходим дальше
      console.log('Code entered:', code.join(''));
      // TODO: Здесь будет логика проверки кода
    }
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Автоматический переход к следующему полю
    if (text && index < 3) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const getTitle = () => {
    if (showCodeInput) {
      switch (language) {
        case 'kz':
          return 'Кодты енгізіңіз';
        case 'en':
          return 'Enter code';
        default:
          return 'Введите код';
      }
    }
    
    switch (language) {
      case 'kz':
        return 'Телефон арқылы кіру';
      case 'en':
        return 'Login by phone';
      default:
        return 'Вход по телефону';
    }
  };

  const getSubtitle = () => {
    if (showCodeInput) {
      switch (language) {
        case 'kz':
          return 'Кіретін қоңыраудың соңғы 4 саны қажет.\nЕгер смс келсе — смстен кодты енгізіңіз.';
        case 'en':
          return 'Need the last 4 digits of the incoming call.\nIf SMS arrived — enter the code from SMS.';
        default:
          return 'Нужны последние 4 цифры номера\nвходящего звонка.\nЕсли пришла смс — введите код из смс.';
      }
    }
    return '';
  };

  const getPhonePlaceholder = () => {
    switch (language) {
      case 'kz':
        return 'Телефон';
      case 'en':
        return 'Phone';
      default:
        return 'Телефон';
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

  const getResendText = () => {
    switch (language) {
      case 'kz':
        return 'Жаңасын алуға болады';
      case 'en':
        return 'Get new code available in';
      default:
        return 'Получить новый можно через';
    }
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
        
        {showCodeInput && (
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        )}

        {/* Input Section */}
        {!showCodeInput ? (
          <View style={styles.phoneInputContainer}>
            {/* Country Code */}
            <View style={styles.countryCodeContainer}>
              <Text style={styles.flagEmoji}>🇰🇿</Text>
              <Text style={styles.countryCode}>+7</Text>
            </View>

            {/* Phone Input */}
            <TextInput
              style={styles.phoneInput}
              placeholder={getPhonePlaceholder()}
              placeholderTextColor="#6B7280"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        ) : (
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (codeInputRefs.current[index] = ref)}
                style={styles.codeInput}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent: { key } }) => handleCodeKeyPress(key, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
        )}

        {/* Next Button */}
        <Animated.View style={[styles.nextButtonContainer, animatedNextButtonStyle]}>
          <Pressable 
            style={[
              styles.nextButton,
              (showCodeInput ? code.every(d => d) : phone.length >= 10) && styles.nextButtonActive
            ]} 
            onPress={handleNext}
            disabled={showCodeInput ? !code.every(d => d) : phone.length < 10}
          >
            <Text style={styles.nextButtonText}>{getNextButtonText()}</Text>
          </Pressable>
        </Animated.View>

        {/* Additional Links */}
        {showCodeInput ? (
          <Text style={styles.resendText}>
            {getResendText()} <Text style={styles.resendTime}>00:56</Text>
          </Text>
        ) : (
          <Pressable onPress={() => console.log('Login with password')}>
            <Text style={styles.passwordLink}>{getPasswordLinkText()}</Text>
          </Pressable>
        )}
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 32,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27343a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  flagEmoji: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#27343a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    backgroundColor: '#27343a',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
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
  resendText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  resendTime: {
    color: '#FFFFFF',
  },
});

