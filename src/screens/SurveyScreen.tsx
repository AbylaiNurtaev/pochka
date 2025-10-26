import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { SurveyData } from '../components/survey/types';
import { ruText, kzText } from '../components/survey/texts';
import { SurveyHeader } from '../components/survey/SurveyHeader';
import { SurveyStep } from '../components/survey/SurveyStep';
import { SurveyFooter } from '../components/survey/SurveyFooter';
import KidneyGeneration from '../components/survey/KidneyGeneration';

type SurveyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Survey'>;

interface Props {
  navigation: SurveyScreenNavigationProp;
}

const SurveyScreen: React.FC<Props> = ({ navigation }) => {
  const { language } = useLanguage();
  const text = language === 'kz' ? kzText : ruText;
  
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<SurveyData>({ language });
  const [touched, setTouched] = useState<Record<number, boolean>>({});
  const [showKidneyGeneration, setShowKidneyGeneration] = useState(false);

  useEffect(() => {
    setData((prev: SurveyData) => ({ ...prev, language }));
  }, [language]);

  const totalSteps = 10; // 10 шагов опроса (без логина)

  const isStepOptional = (s: number) => {
    // Шаги 7, 8, 9, 10 необязательные (давление, диагнозы, операции, размеры почек)
    return s >= 7;
  };

  const isStepValid = (s: number): boolean => {
    switch (s) {
      case 1: return Boolean(data.name && data.name.trim().length >= 2);
      case 2: return Boolean(data.birthDate);
      case 3: return Boolean(data.gender);
      case 4: return Boolean(data.heightCm && data.heightCm > 40 && data.heightCm < 250);
      case 5: return Boolean(data.weightKg && data.weightKg > 10 && data.weightKg < 400);
      case 6: return true; // BMI информативный
      case 7: return true; // Давление необязательное
      case 8: return true; // Диагнозы необязательные
      case 9: return true; // Операции необязательные
      case 10: return true; // Размеры почек необязательные
      default: return true;
    }
  };

  const next = async () => {
    setTouched((prev) => ({ ...prev, [step]: true }));
    if (!isStepOptional(step) && !isStepValid(step)) return;
    
    if (step === totalSteps) {
      // Показываем экран генерации почки
      setShowKidneyGeneration(true);
      return;
    }
    
    setStep((s) => s + 1);
  };

  const back = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleGenerationComplete = () => {
    // Переходим на экран выбора метода входа/регистрации
    navigation.navigate('AuthMethod');
  };


  const renderContent = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <SurveyStep
            step={step}
            data={data}
            setData={setData}
            text={text}
            language={language}
            touched={touched}
            isStepOptional={isStepOptional}
            isStepValid={isStepValid}
            onNext={next}
          />
        </View>
      </ScrollView>
    );
  };

  // Если показываем экран генерации почки
  if (showKidneyGeneration) {
    return <KidneyGeneration onComplete={handleGenerationComplete} language={language} />;
  }

  return (
    <View style={styles.container}>
      <SurveyHeader
        step={step}
        totalSteps={totalSteps}
        onBack={back}
        canGoBack={step > 1}
        language={language}
      />
      
      {renderContent()}

      <SurveyFooter
        onNext={next}
        canGoNext={isStepOptional(step) || isStepValid(step)}
        isLastStep={step === totalSteps}
        nextText={step === totalSteps ? text.finish : text.next}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default SurveyScreen;