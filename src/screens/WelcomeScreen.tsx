import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Animated, { ZoomIn, ZoomOut, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const languages = {
  ru: { name: 'Русский', flag: '🇷🇺' },
  kz: { name: 'Қазақша', flag: '🇰🇿' },
  en: { name: 'English', flag: '🇺🇸' },
};

export default function WelcomeScreen({ navigation }: Props) {
  const { language, setLanguage, t } = useLanguage();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isAgreed, setIsAgreed] = useState(false);
  const scale = useSharedValue(1);

  const greetings = useMemo(() => [t('welcome'), 'Hello', 'Привет', 'Сәлем'], [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleContinue = () => {
    if (!isAgreed) return;
    scale.value = withSpring(0.95, {}, () => { scale.value = withSpring(1); });
    navigation.navigate('Survey');
  };

  return (
    <ImageBackground source={require('../../assets/splash-icon.png')} style={styles.container} imageStyle={styles.bgImg}>
      <View style={styles.center}>


        <Animated.Text
          entering={ZoomIn.duration(450)}
          exiting={ZoomOut.duration(450)}
          key={greetings[greetingIndex]}
          style={styles.title}
        >
          {greetings[greetingIndex]}
        </Animated.Text>

        <View style={styles.langRow}>
          {Object.entries(languages).map(([key, lang]) => (
            <Pressable
              key={key}
              style={[styles.langButton, language === key && styles.langButtonActive]}
              onPress={() => setLanguage(key as Language)}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <Text style={[styles.langText, language === key && styles.langTextActive]}>
                {lang.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.agreement}>
          <Pressable style={styles.checkbox} onPress={() => setIsAgreed(!isAgreed)}>
            <View style={[styles.checkboxInner, isAgreed && styles.checkboxChecked]}>
              {isAgreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </Pressable>
          <Text style={styles.agreementText}>
            {t('agreeTo')}{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>
              {t('terms')}
            </Text>
            {' '}{t('and')}{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
              {t('privacyPolicy')}
            </Text>
          </Text>
        </View>

        <Animated.View style={animatedButtonStyle}>
          <Pressable
            style={[styles.continueButton, !isAgreed && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isAgreed}
          >
            <LinearGradient
              colors={isAgreed ? ['#10b981', '#059669'] : ['#6b7280', '#4b5563']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.continueText, !isAgreed && styles.continueTextDisabled]}>
                {t('continue')}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  bgImg: { opacity: 0.15, resizeMode: 'cover' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  modelContainer: { marginBottom: 32, alignItems: 'center', justifyContent: 'center' },
  kidneyModel: { 
    width: 200, 
    height: 200, 
    backgroundColor: '#06a8f9', 
    borderRadius: 100, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#06a8f9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modelText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  modelSubtext: { color: 'white', fontSize: 12, marginTop: 4 },
  title: { fontSize: 44, fontWeight: '800', color: '#fff', marginBottom: 24 },
  langRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 8,
    marginBottom: 32,
  },
  langButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  langButtonActive: { backgroundColor: 'rgba(6, 168, 249, 0.2)' },
  langFlag: { fontSize: 20, marginRight: 8 },
  langText: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  langTextActive: { color: '#06a8f9', fontWeight: '600' },
  agreement: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingHorizontal: 16 },
  checkbox: { marginRight: 12 },
  checkboxInner: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#6b7280', alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#06a8f9', borderColor: '#06a8f9' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  agreementText: { flex: 1, fontSize: 14, color: '#9ca3af', lineHeight: 20 },
  link: { color: '#06a8f9', fontWeight: '600', textDecorationLine: 'underline' },
  continueButton: { width: '100%', height: 56, borderRadius: 16, overflow: 'hidden' },
  continueButtonDisabled: { opacity: 0.5 },
  gradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  continueText: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
  continueTextDisabled: { color: '#9ca3af' },
});
