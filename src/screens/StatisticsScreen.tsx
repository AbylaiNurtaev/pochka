import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StatisticsScreen() {
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'kz':
        return 'Статистика';
      case 'en':
        return 'Statistics';
      default:
        return 'Статистика';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{getTitle()}</Text>

        {/* Health Stats */}
        <View style={styles.statCard}>
          <Icon name="heart-outline" size={32} color="#EF4444" />
          <Text style={styles.statLabel}>
            {language === 'kz' ? 'Қысым' : 'Давление'}
          </Text>
          <Text style={styles.statValue}>120/80</Text>
        </View>

        <View style={styles.statCard}>
          <Icon name="weight-outline" size={32} color="#10B981" />
          <Text style={styles.statLabel}>
            {language === 'kz' ? 'БИМ' : 'ИМТ'}
          </Text>
          <Text style={styles.statValue}>22.5</Text>
        </View>

        <View style={styles.statCard}>
          <Icon name="water-outline" size={32} color="#3B82F6" />
          <Text style={styles.statLabel}>
            {language === 'kz' ? 'Сұйық мөлшері' : 'Объем жидкости'}
          </Text>
          <Text style={styles.statValue}>
            {language === 'kz' ? '2.5 л' : '2.5 л'}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#27343a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});


