import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AnalyticsScreen() {
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'kz':
        return 'Аналитика';
      case 'en':
        return 'Analytics';
      default:
        return 'Аналитика';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{getTitle()}</Text>

        {/* Chart Placeholder */}
        <View style={styles.chartCard}>
          <Icon name="stats-chart-outline" size={64} color="#6B7280" />
          <Text style={styles.chartText}>
            {language === 'kz' ? 'Графиктер мұнда көрсетіледі' : 'Графики будут отображаться здесь'}
          </Text>
        </View>

        {/* Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Icon name="trending-up" size={24} color="#10B981" />
            <Text style={styles.metricValue}>+12%</Text>
            <Text style={styles.metricLabel}>
              {language === 'kz' ? 'Өсу' : 'Рост'}
            </Text>
          </View>
          <View style={styles.metricCard}>
            <Icon name="calendar" size={24} color="#3B82F6" />
            <Text style={styles.metricValue}>24</Text>
            <Text style={styles.metricLabel}>
              {language === 'kz' ? 'Күн' : 'Дней'}
            </Text>
          </View>
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
  chartCard: {
    backgroundColor: '#27343a',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    minHeight: 200,
  },
  chartText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#27343a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});


