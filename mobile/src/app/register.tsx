import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCreateAccount = () => {
    if (createPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordError('');

    const payload = {
      email: email.trim(),
      password: createPassword,
    };

    console.log('Create Account Payload:', payload);

    router.push('/profile-create');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Create Account</ThemedText>

        <ThemedView style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Create Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={createPassword}
            onChangeText={setCreatePassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </ThemedView>

        {passwordError ? (
          <ThemedText style={styles.errorText}>
            {passwordError}
          </ThemedText>
        ) : null}

        <Pressable
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <ThemedText style={styles.createAccountButtonText}>
            Create Account
          </ThemedText>
        </Pressable>

        <ThemedText style={styles.alreadyHaveAccountPrompt}>
          Already have an account?
        </ThemedText>

        <Pressable
          style={styles.backToSignInButton}
          onPress={() => router.push('/')}
        >
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
  color: '#000000',
  alignSelf: 'stretch',
},
inputGroup: {
  alignSelf: 'stretch',
  gap: 12,
  marginTop: 20,
},
errorText: {
  alignSelf: 'stretch',
  marginTop: 8,
  color: '#D32F2F',
},
alreadyHaveAccountPrompt: {
  textAlign: 'center',
  marginTop: 100,
},
backToSignInButton: {
  borderWidth: 1,
  borderColor: '#000000',
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
  borderColor: '#000000',
  borderRadius: 8,
  paddingHorizontal: 28,
  paddingVertical: 10,
  marginTop: 10,
  },
createAccountButtonText: {
  fontWeight: '700',
  },
});