import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
// Предполагаем, что вы используете эту библиотеку для масок
import { MaskedTextInput } from 'react-native-mask-text'; 
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
// Если используете, добавьте иконки (например, react-native-vector-icons)
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Language } from '../../contexts/LanguageContext';

// Ваши существующие типы и утилиты
import { SurveyData, SurveyTexts, kidneyDiagnosesCatalog, kidneySurgeryCatalog } from './types';
import { computeBmi, computeBsa, bmiCategory } from './utils';

// --- ИМПОРТ ИКОНОК ---
const MaleIcon = ({ active }: { active: boolean }) => (
  <Icon 
    name="man-sharp" 
    size={30} 
    color={active ? '#FFFFFF' : '#374151'} 
  />
);
const FemaleIcon = ({ active }: { active: boolean }) => (
  <Icon 
    name="woman-sharp" 
    size={30} 
    color={active ? '#FFFFFF' : '#374151'} 
  />
);
// --------------------

interface SurveyStepProps {
  step: number;
  data: SurveyData;
  setData: (data: SurveyData) => void;
  text: SurveyTexts;
  language: Language;
  touched: Record<number, boolean>;
  isStepOptional: (step: number) => boolean;
  isStepValid: (step: number) => boolean;
}

export const SurveyStep: React.FC<SurveyStepProps> = ({
  step,
  data,
  setData,
  text,
  language,
  touched,
  isStepOptional,
  isStepValid
}) => {
  
  // Хелпер для определения, нужно ли показывать ошибку
  const shouldShowError = (stepNum: number) => 
    !isStepOptional(stepNum) && touched[stepNum] && !isStepValid(stepNum);

  const renderStepContent = () => {
    switch (step) {
      case 1: // Имя (стандартный TextInput, можно добавить mask='A*' для ограничения символов)
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.name} 👤</Text>
            <TextInput
              style={[
                styles.input,
                shouldShowError(1) && styles.inputError,
                data.name && styles.inputFocused,
              ]}
              placeholder={text.placeholders.name}
              value={data.name || ''}
              onChangeText={(text) => setData({ ...data, name: text })}
              placeholderTextColor="#9CA3AF"
            />
            {shouldShowError(1) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Атыңызды енгізіңіз (кемінде 2 символ)' : 'Пожалуйста, введите имя (минимум 2 символа)'}
              </Text>
            )}
          </Animated.View>
        );

      case 2: // Дата рождения (DD.MM.YYYY маска)
        const dateMask = "99.99.9999";
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.dob} 🎂</Text>
            <MaskedTextInput
              mask={dateMask}
              keyboardType="numeric"
              style={[
                styles.input,
                shouldShowError(2) && styles.inputError,
                data.birthDate && styles.inputFocused,
              ]}
              placeholder={text.placeholders.dob}
              value={data.birthDate || ''}
              onChangeText={(masked, unmasked) => setData({ ...data, birthDate: masked })}
              placeholderTextColor="#9CA3AF"
            />
            {shouldShowError(2) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Туған күніңізді көрсетіңіз (ДД.ММ.ГГГГ)' : 'Укажите дату рождения (ДД.ММ.ГГГГ)'}
              </Text>
            )}
          </Animated.View>
        );

      case 3: // Пол (Улучшенный дизайн с иконками)
        const isMale = data.gender === 'male';
        const isFemale = data.gender === 'female';
        
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.gender} 🚻</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  isMale && styles.genderButtonActive,
                  shouldShowError(3) && !data.gender && styles.genderButtonError
                ]}
                onPress={() => setData({ ...data, gender: 'male' })}
              >
                <MaleIcon active={isMale} />
                <Text style={[
                  styles.genderButtonText,
                  isMale && styles.genderButtonTextActive
                ]}>
                  {text.gender.male}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  isFemale && styles.genderButtonActive,
                  shouldShowError(3) && !data.gender && styles.genderButtonError
                ]}
                onPress={() => setData({ ...data, gender: 'female' })}
              >
                <FemaleIcon active={isFemale} />
                <Text style={[
                  styles.genderButtonText,
                  isFemale && styles.genderButtonTextActive
                ]}>
                  {text.gender.female}
                </Text>
              </TouchableOpacity>
            </View>
            {shouldShowError(3) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Бір нұсқаны таңдаңыз' : 'Выберите один вариант'}
              </Text>
            )}
          </Animated.View>
        );

      case 4: // Рост (Числовая маска с суффиксом " см")
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.height} 📏</Text>
            <View style={styles.inputAffixContainer}>
                <MaskedTextInput
                    mask="999" // Максимум 3 цифры (40-250)
                    keyboardType="numeric"
                    style={[
                        styles.input,
                        styles.inputAffix,
                        shouldShowError(4) && styles.inputError,
                        data.heightCm && styles.inputFocused,
                    ]}
                    placeholder={text.placeholders.height}
                    value={data.heightCm?.toString() || ''}
                    onChangeText={(_, unmasked) => setData({ ...data, heightCm: unmasked ? parseInt(unmasked, 10) : undefined })}
                    placeholderTextColor="#9CA3AF"
                    maxLength={3} // Ограничение на 3 цифры
                />
                <Text style={styles.affixText}>см</Text>
            </View>
            {shouldShowError(4) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Бойыңызды 40-250 см аралығында енгізіңіз' : 'Введите рост от 40 до 250 см'}
              </Text>
            )}
          </Animated.View>
        );

      case 5: // Вес (Числовая маска с суффиксом " кг")
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.weight} ⚖️</Text>
            <View style={styles.inputAffixContainer}>
                <MaskedTextInput
                    mask="999" // Максимум 3 цифры (10-400)
                    keyboardType="numeric"
                    style={[
                        styles.input,
                        styles.inputAffix,
                        shouldShowError(5) && styles.inputError,
                        data.weightKg && styles.inputFocused,
                    ]}
                    placeholder={text.placeholders.weight}
                    value={data.weightKg?.toString() || ''}
                    onChangeText={(_, unmasked) => setData({ ...data, weightKg: unmasked ? parseInt(unmasked, 10) : undefined })}
                    placeholderTextColor="#9CA3AF"
                    maxLength={3} // Ограничение на 3 цифры
                />
                <Text style={styles.affixText}>кг</Text>
            </View>
            {shouldShowError(5) && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Салмағыңызды 10-400 кг аралығында енгізіңіз' : 'Введите вес от 10 до 400 кг'}
              </Text>
            )}
          </Animated.View>
        );

      case 6: // BMI результат (Улучшенный дизайн)
        const bmi = computeBmi(data.heightCm, data.weightKg);
        const bsa = computeBsa(data.heightCm, data.weightKg);
        const bmiStatus = bmiCategory(bmi, language);
        
        // Динамический цвет статуса BMI
        let statusColor = '#6b7280'; // Default
        if (bmi && bmi < 18.5) statusColor = '#3b82f6'; // Blue for Underweight
        else if (bmi && bmi >= 18.5 && bmi < 25) statusColor = '#00A86B'; // Green for Normal
        else if (bmi && bmi >= 25 && bmi < 30) statusColor = '#f59e0b'; // Yellow/Orange for Overweight
        else if (bmi && bmi >= 30) statusColor = '#ef4444'; // Red for Obesity

        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.bmiResult} 📊</Text>
            <View style={styles.bmiContainer}>
              <View style={[styles.bmiResultCard, { borderColor: statusColor + '40' }]}>
                <Text style={styles.bmiValue}>{bmi?.toFixed(1) ?? '—'}</Text>
                <Text style={[styles.bmiStatus, { color: statusColor }]}>{bmiStatus}</Text>
              </View>
              
              <View style={styles.bsaContainer}>
                <Text style={styles.bsaTitle}>
                  {language === 'kz' ? 'Дене бетінің ауданы (ППТ)' : 'Площадь поверхности тела (ППТ)'}
                </Text>
                <Text style={styles.bsaValue}>
                  {bsa ? `${bsa.toFixed(2)} м²` : '—'}
                </Text>
              </View>
            </View>
          </Animated.View>
        );

      case 7: // Давление
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.bp} 💓</Text>
            <TextInput
              style={[
                styles.input,
                !isStepOptional && touched && !isStepValid ? styles.inputError : null
              ]}
              placeholder={text.placeholders.bp}
              value={data.bloodPressure || ''}
              onChangeText={(text) => {
                // Маска NN(N)/NN(N)
                const digits = text.replace(/\D/g, '').slice(0, 6);
                const left = digits.slice(0, 3);
                const right = digits.slice(3, 6);
                let formatted = left;
                if (right) formatted += `/${right}`;
                setData({ ...data, bloodPressure: formatted });
              }}
              keyboardType="numeric"
            />
            {!isStepOptional && touched && !isStepValid && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Қан қысымын САД/ДАД форматында көрсетіңіз' : 'Укажите давление в формате САД/ДАД'}
              </Text>
            )}
          </Animated.View>
        );

      case 8: // Диагнозы
        const [search, setSearch] = useState('');
        const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
        
        const filteredCatalog = kidneyDiagnosesCatalog.filter(cat =>
          cat.category.toLowerCase().includes(search.toLowerCase()) ||
          cat.items.some(item => item.toLowerCase().includes(search.toLowerCase()))
        );

        const toggleDiagnosis = (diagnosis: string) => {
          const currentDiagnoses = data.diagnoses || [];
          if (currentDiagnoses.includes(diagnosis)) {
            setData({ ...data, diagnoses: currentDiagnoses.filter(d => d !== diagnosis) });
          } else {
            setData({ ...data, diagnoses: [...currentDiagnoses, diagnosis] });
          }
        };

        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.diagnoses} 🏥</Text>
            
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={language === 'kz' ? 'Іздеу...' : 'Поиск...'}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <ScrollView style={styles.catalogContainer} showsVerticalScrollIndicator={false}>
              {filteredCatalog.map((cat) => (
                <View key={cat.category} style={styles.categoryCard}>
                  <TouchableOpacity
                    style={styles.categoryHeader}
                    onPress={() => setOpenCategories({ ...openCategories, [cat.category]: !openCategories[cat.category] })}
                  >
                    <Text style={styles.categoryTitle}>{cat.category}</Text>
                    <Icon 
                      name={openCategories[cat.category] ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                  
                  {openCategories[cat.category] && (
                    <Animated.View entering={SlideInRight.duration(200)} style={styles.categoryContent}>
                      {cat.items.map((item) => {
                        const selected = (data.diagnoses || []).includes(item);
                        return (
                          <TouchableOpacity
                            key={item}
                            style={styles.diagnosisItem}
                            onPress={() => toggleDiagnosis(item)}
                          >
                            <View style={styles.checkboxContainer}>
                              <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                                {selected && <Icon name="checkmark" size={16} color="#FFFFFF" />}
                              </View>
                            </View>
                            <Text style={styles.diagnosisText}>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </Animated.View>
                  )}
                </View>
              ))}
            </ScrollView>

            {data.diagnoses && data.diagnoses.length > 0 && (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedTitle}>
                  {language === 'kz' ? 'Таңдалған диагноздар:' : 'Выбранные диагнозы:'}
                </Text>
                <View style={styles.selectedItems}>
                  {data.diagnoses.map((diagnosis) => (
                    <View key={diagnosis} style={styles.selectedItem}>
                      <Text style={styles.selectedItemText}>{diagnosis}</Text>
                      <TouchableOpacity
                        onPress={() => toggleDiagnosis(diagnosis)}
                        style={styles.removeButton}
                      >
                        <Icon name="close" size={12} color="#059669" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        );

      case 9: // Операции
        const [surgerySearch, setSurgerySearch] = useState('');
        const [openSurgeryCategories, setOpenSurgeryCategories] = useState<Record<string, boolean>>({});
        
        const filteredSurgeryCatalog = kidneySurgeryCatalog.filter(cat =>
          cat.category.toLowerCase().includes(surgerySearch.toLowerCase()) ||
          cat.items.some(item => item.toLowerCase().includes(surgerySearch.toLowerCase()))
        );

        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.surgery} ⚕️</Text>
            
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={language === 'kz' ? 'Операция іздеу...' : 'Поиск операции...'}
                value={surgerySearch}
                onChangeText={setSurgerySearch}
              />
            </View>

            <ScrollView style={styles.catalogContainer} showsVerticalScrollIndicator={false}>
              {filteredSurgeryCatalog.map((cat) => (
                <View key={cat.category} style={styles.categoryCard}>
                  <TouchableOpacity
                    style={styles.categoryHeader}
                    onPress={() => setOpenSurgeryCategories({ ...openSurgeryCategories, [cat.category]: !openSurgeryCategories[cat.category] })}
                  >
                    <Text style={styles.categoryTitle}>{cat.category}</Text>
                    <Icon 
                      name={openSurgeryCategories[cat.category] ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                  
                  {openSurgeryCategories[cat.category] && (
                    <Animated.View entering={SlideInRight.duration(200)} style={styles.categoryContent}>
                      {cat.items.map((item) => {
                        const selected = data.surgeryType === item;
                        return (
                          <TouchableOpacity
                            key={item}
                            style={styles.surgeryItem}
                            onPress={() => setData({ ...data, surgeryType: item })}
                          >
                            <View style={styles.radioContainer}>
                              <View style={[styles.radio, selected && styles.radioSelected]}>
                                {selected && <View style={styles.radioInner} />}
                              </View>
                            </View>
                            <Text style={styles.surgeryText}>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </Animated.View>
                  )}
                </View>
              ))}
            </ScrollView>

            {data.surgeryType && (
              <View style={styles.selectedSurgeryContainer}>
                <Text style={styles.selectedTitle}>
                  {language === 'kz' ? 'Таңдалған операция:' : 'Выбранная операция:'}
                </Text>
                <View style={styles.selectedSurgeryItem}>
                  <Text style={styles.selectedSurgeryText}>{data.surgeryType}</Text>
                  <TouchableOpacity
                    onPress={() => setData({ ...data, surgeryType: undefined })}
                    style={styles.removeButton}
                  >
                    <Icon name="close" size={16} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder={language === 'kz' ? 'Операция күні (міндетті емес)' : 'Дата операции (необязательно)'}
              value={data.surgeryDate || ''}
              onChangeText={(text) => setData({ ...data, surgeryDate: text || undefined })}
            />
          </Animated.View>
        );

      case 10: // Размеры почек
        return (
          <Animated.View entering={SlideInRight.duration(350)} exiting={SlideOutLeft.duration(250)} style={styles.stepContent}>
            <Text style={styles.stepTitle}>{text.steps.kidneys} 🫘</Text>
            <View style={styles.kidneyInputsContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.kidneyInput,
                  !isStepOptional && touched && !isStepValid ? styles.inputError : null
                ]}
                placeholder={text.placeholders.kidneyLeft}
                value={data.kidneySizes?.left?.toString() || ''}
                onChangeText={(text) => setData({ 
                  ...data, 
                  kidneySizes: { 
                    ...(data.kidneySizes || {}), 
                    left: text ? parseInt(text.replace(/\D/g, ''), 10) : undefined 
                  } 
                })}
                keyboardType="numeric"
              />
              <TextInput
                style={[
                  styles.input,
                  styles.kidneyInput,
                  !isStepOptional && touched && !isStepValid ? styles.inputError : null
                ]}
                placeholder={text.placeholders.kidneyRight}
                value={data.kidneySizes?.right?.toString() || ''}
                onChangeText={(text) => setData({ 
                  ...data, 
                  kidneySizes: { 
                    ...(data.kidneySizes || {}), 
                    right: text ? parseInt(text.replace(/\D/g, ''), 10) : undefined 
                  } 
                })}
                keyboardType="numeric"
              />
            </View>
            {!isStepOptional && touched && !isStepValid && (
              <Text style={styles.errorText}>
                {language === 'kz' ? 'Екі бүйректің де өлшемдерін көрсетіңіз' : 'Укажите размеры обеих почек'}
              </Text>
            )}
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStepContent()}
    </View>
  );
};

// --- СТИЛИ (STYLING) ---
const styles = StyleSheet.create({
  container: {
    minHeight: 250, // Увеличим высоту для лучшего UX
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22, // Немного уменьшим для лучшего восприятия
    fontWeight: '700', // Сделаем жирнее
    color: '#111827', // Более темный, насыщенный цвет
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 30,
  },
  // --- Input Styles ---
  input: {
    borderWidth: 2, // Чуть толще рамка
    borderColor: '#E5E7EB',
    borderRadius: 12, // Чуть меньше скругление
    paddingHorizontal: 18,
    paddingVertical: 18, // Больше вертикальный отступ
    fontSize: 18, // Крупнее шрифт
    color: '#111827',
    backgroundColor: '#F9FAFB', // Легкий серый фон
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#00A86B', // Зеленый при заполнении
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 4,
    fontWeight: '500',
  },
  // --- Input Affix (см, кг) ---
  inputAffixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAffix: {
    flex: 1,
    paddingRight: 60, // Оставляем место для суффикса
  },
  affixText: {
    position: 'absolute',
    right: 20,
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '500',
  },
  // --- Gender Buttons ---
  genderContainer: {
    flexDirection: 'row',
    gap: 16, // Увеличим расстояние
  },
  genderButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // Пространство между иконкой и текстом
    shadowColor: '#000', // Легкая тень для "глубины"
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  genderButtonActive: {
    backgroundColor: '#00A86B', // Яркий акцент
    borderColor: '#00A86B',
    shadowOpacity: 0.15,
  },
  genderButtonError: {
    borderColor: '#EF4444',
  },
  genderButtonText: {
    fontSize: 18, // Крупнее шрифт
    fontWeight: '600',
    color: '#374151',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  // --- BMI/BSA Results ---
  bmiContainer: {
    alignItems: 'center',
    gap: 30, // Увеличим расстояние
  },
  bmiResultCard: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    borderWidth: 4, // Толстая рамка
    backgroundColor: '#FFFFFF',
    width: '80%', // Сделаем карточку чуть меньше
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  bmiValue: {
    fontSize: 64, // Крупный, заметный результат
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  bmiStatus: {
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'uppercase', // Все заглавные
  },
  bsaContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)', // Светло-голубой фон
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    width: '100%',
  },
  bsaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  bsaValue: {
    fontSize: 32, // Крупный результат
    fontWeight: '800',
    color: '#3B82F6', // Яркий синий акцент
  },
  // --- Новые стили для дополнительных шагов ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  catalogContainer: {
    maxHeight: 300,
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  diagnosisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  diagnosisText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  surgeryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  radioContainer: {
    marginRight: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#00A86B',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A86B',
  },
  surgeryText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  selectedContainer: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 12,
  },
  selectedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedItemText: {
    fontSize: 12,
    color: '#166534',
    marginRight: 8,
  },
  removeButton: {
    padding: 2,
  },
  selectedSurgeryContainer: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  selectedSurgeryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedSurgeryText: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
  },
  kidneyInputsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  kidneyInput: {
    flex: 1,
  },
});