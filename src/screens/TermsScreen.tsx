import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type TermsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Terms'>;

interface Props {
  navigation: TermsScreenNavigationProp;
}

const TermsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Условия использования</Text>
        
        <Text style={styles.sectionTitle}>1. Общие положения</Text>
        <Text style={styles.text}>
          Настоящие условия использования регулируют отношения между пользователем и приложением.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Права и обязанности</Text>
        <Text style={styles.text}>
          Пользователь обязуется использовать приложение в соответствии с его назначением.
        </Text>
        
        <Text style={styles.sectionTitle}>3. Ответственность</Text>
        <Text style={styles.text}>
          Приложение предоставляется "как есть" без каких-либо гарантий.
        </Text>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Privacy')}
        >
          <Text style={styles.buttonText}>Принимаю условия</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TermsScreen;
