import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Kidney3DView from '../components/Kidney3DView';
import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';

export default function HomeScreen() {
  const { language } = useLanguage();

  const getWelcomeText = () => {
    switch (language) {
      case 'kz':
        return 'Қош келдіңіз!';
      case 'en':
        return 'Welcome!';
      default:
        return 'Добро пожаловать!';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>{getWelcomeText()}</Text>
          <Icon name="notifications-outline" size={28} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
  {/* Здесь может быть другой контент */}
  
  <Kidney3DView />
  
  {/* Здесь может быть другой контент */}
</View>
        {/* Kidney Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="medical" size={32} color="#00A86B" />
            <Text style={styles.cardTitle}>
              {language === 'kz' ? 'Бүйректің жағдайы' : 'Состояние почки'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Icon name="checkmark-circle" size={24} color="#10B981" />
            <Text style={styles.statusText}>
              {language === 'kz' ? 'Қалыпты' : 'В норме'}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {language === 'kz' ? 'Жылдам әрекеттер' : 'Быстрые действия'}
        </Text>
        <View style={styles.actionsGrid}>
          <View style={styles.actionCard}>
            <Icon name="calendar-outline" size={32} color="#3B82F6" />
            <Text style={styles.actionText}>
              {language === 'kz' ? 'Келу' : 'Запись'}
            </Text>
          </View>
          <View style={styles.actionCard}>
            <Icon name="document-text-outline" size={32} color="#10B981" />
            <Text style={styles.actionText}>
              {language === 'kz' ? 'Құжаттар' : 'Документы'}
            </Text>
          </View>
          <View style={styles.actionCard}>
            <Icon name="chatbubbles-outline" size={32} color="#F59E0B" />
            <Text style={styles.actionText}>
              {language === 'kz' ? 'Қолдау' : 'Поддержка'}
            </Text>
          </View>
          <View style={styles.actionCard}>
            <Icon name="settings-outline" size={32} color="#8B5CF6" />
            <Text style={styles.actionText}>
              {language === 'kz' ? 'Баптаулар' : 'Настройки'}
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>
          {language === 'kz' ? 'Соңғы әрекеттер' : 'Последние действия'}
        </Text>
        <View style={styles.activityCard}>
          <Icon name="time-outline" size={24} color="#6B7280" />
          <Text style={styles.activityText}>
            {language === 'kz' ? 'Соңғы тексеру: 15 Қаңтар' : 'Последний осмотр: 15 Января'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#27343a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#27343a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27343a',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
});


