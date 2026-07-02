import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Welcome to Squad Up
          </ThemedText>

          <TextInput
          style={styles.input}
          
          placeholder="Email"
          placeholderTextColor="#888"
          />

          <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          />

          <Pressable style={styles.signInButton}>
            <ThemedText style={styles.signInButtonText}>
              Sign In
            </ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedText style={styles.createAccountPrompt}>
          Don't Have An Account?
        </ThemedText>

        <Pressable style={styles.createAccountButton}
                    onPress={() => router.push('/register')}>
          <ThemedText style={styles.createAccountButtonText}>
            Sign Up Here!
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signInButton: {
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius: 8,
  paddingHorizontal: 32,
  paddingVertical: 12,
  marginTop: Spacing.two,
  },
  signInButtonText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  input: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#fff',
  alignSelf: 'stretch',
  },
  title: {
    textAlign: 'center',
  },
  createAccountPrompt: {
  textAlign: 'center',
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginBottom: 200,
  },
  createAccountButtonText: {
    fontWeight: '700',
  },
});
