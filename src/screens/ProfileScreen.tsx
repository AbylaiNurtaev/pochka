import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'kz':
        return 'Профиль';
      case 'en':
        return 'Profile';
      default:
        return 'Профиль';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{getTitle()}</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Icon name="person" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>
            {language === 'kz' ? 'Қолданушы' : 'Пользователь'}
          </Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="person-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuText}>
              {language === 'kz' ? 'Жеке ақпарат' : 'Личная информация'}
            </Text>
            <Icon name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="document-text-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuText}>
              {language === 'kz' ? 'Менің құжаттарым' : 'Мои документы'}
            </Text>
            <Icon name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="settings-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuText}>
              {language === 'kz' ? 'Баптаулар' : 'Настройки'}
            </Text>
            <Icon name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.menuText}>
              {language === 'kz' ? 'Көмек' : 'Помощь'}
            </Text>
            <Icon name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
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
  profileCard: {
    backgroundColor: '#27343a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  menu: {
    gap: 8,
  },
  menuItem: {
    backgroundColor: '#27343a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});


