import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

export default function RegisterScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Create Account</ThemedText>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
        />

        <TextInput
            style={styles.input}
            placeholder="Create Password"
            placeholderTextColor="#888"
            secureTextEntry
        />

        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
        />

        <Pressable style={styles.createAccountButton}>
            <ThemedText style={styles.createAccountButtonText}>
                Create Account
            </ThemedText>
        </Pressable>

        <ThemedText style={styles.alreadyHaveAccountPrompt}>
                  Already have an account?
        </ThemedText>
            <Pressable style={styles.backToSignInButton}
                onPress={() => router.push('/')}>
                <ThemedText style={styles.backToSignInText}>
                    Back to sign in
                </ThemedText>
            </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
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
  alreadyHaveAccountPrompt: {
  textAlign: 'center',
  marginTop: 100,
  },
  backToSignInButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginBottom: 200,
  },
  backToSignInText: {
    fontWeight: '700',
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginTop: 10,
  },
  createAccountButtonText: {
    fontWeight: '700',
  },
});