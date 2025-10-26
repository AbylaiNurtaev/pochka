import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthMethod'>;

export default function AuthMethodScreen({ navigation }: Props) {
  const { language } = useLanguage();
  
  const phoneScale = useSharedValue(1);
  const emailScale = useSharedValue(1);

  const animatedPhoneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: phoneScale.value }],
  }));

  const animatedEmailStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emailScale.value }],
  }));

  const handlePhonePress = () => {
    phoneScale.value = withSpring(0.95, {}, () => {
      phoneScale.value = withSpring(1);
    });
    // Переход на экран входа/регистрации по телефону
    navigation.navigate('PhoneAuth');
  };

  const handleEmailPress = () => {
    emailScale.value = withSpring(0.95, {}, () => {
      emailScale.value = withSpring(1);
    });
    // Переход на экран входа/регистрации по email
    navigation.navigate('EmailAuth');
  };

  const getTitle = () => {
    switch (language) {
      case 'kz':
        return 'Кіру және тіркелу';
      case 'en':
        return 'Login and Registration';
      default:
        return 'Вход и регистрация';
    }
  };

  const getSubtitle = () => {
    switch (language) {
      case 'kz':
        return 'Соңғы рет сіз email немесе телефон арқылы кірдіңіз';
      case 'en':
        return 'Last time you logged in using email or phone';
      default:
        return 'Последний раз вы входили\nс помощью email или телефона';
    }
  };

  const getPhoneText = () => {
    switch (language) {
      case 'kz':
        return 'Телефон арқылы';
      case 'en':
        return 'By phone';
      default:
        return 'По телефону';
    }
  };

  const getEmailText = () => {
    switch (language) {
      case 'kz':
        return 'Электрондық пошта арқылы';
      case 'en':
        return 'By email';
      default:
        return 'По электронной почте';
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/splash-icon.png')} 
      style={styles.container} 
      imageStyle={styles.bgImg}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Phone Button */}
          <Animated.View style={[styles.buttonWrapper, animatedPhoneStyle]}>
            <Pressable style={styles.button} onPress={handlePhonePress}>
              <Text style={styles.buttonText}>{getPhoneText()}</Text>
              <Icon name="call-outline" size={28} color="#FFFFFF" />
            </Pressable>
          </Animated.View>

          {/* Email Button */}
          <Animated.View style={[styles.buttonWrapper, animatedEmailStyle]}>
            <Pressable style={styles.button} onPress={handleEmailPress}>
              <Text style={styles.buttonText}>{getEmailText()}</Text>
              <Icon name="mail-outline" size={28} color="#FFFFFF" />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  bgImg: {
    opacity: 0.15,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#27343a',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

