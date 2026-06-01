import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { isFirebaseFullyConfigured } from '../config/firebase';
import { APP_GRADIENT } from '../constants/gradient';

/**
 * PantryPal login / sign-up — matches app green gradient theme.
 */
export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, signUp, error, setError, isConfigured: isFullyConfigured } = useAuth();

  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const displayError = localError || error;

  const onSubmit = async () => {
    setLocalError('');
    setError(null);

    if (!email.trim() || !password) {
      setLocalError('Enter email and password.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signIn') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
    } catch (e) {
      const msg = friendlyAuthError(e?.code, e?.message);
      setLocalError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={APP_GRADIENT.colors}
      start={APP_GRADIENT.start}
      end={APP_GRADIENT.end}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-3xl bg-white/15 items-center justify-center mb-4 border border-white/20">
              <Text style={{ fontSize: 52 }}>🍽️</Text>
            </View>
            <Text className="text-white text-4xl font-bold tracking-tight">PantryPal</Text>
            <Text className="text-white/75 text-center mt-2 text-base px-4">
              Your smart pantry — track food, cut waste, eat fresher
            </Text>
          </View>

          {!isFullyConfigured && (
            <View className="bg-amber-500/20 border border-amber-300/40 rounded-xl p-3 mb-4">
              <Text className="text-amber-100 text-sm text-center">
                API key is set. Add EXPO_PUBLIC_FIREBASE_APP_ID to .env from Firebase Console →
                Your apps → Web app, enable Email/Password, then restart Expo with --clear.
              </Text>
            </View>
          )}

          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <View className="flex-row bg-accent/60 rounded-xl p-1 mb-5">
              <Pressable
                onPress={() => {
                  setMode('signIn');
                  setLocalError('');
                  setError(null);
                }}
                className={`flex-1 py-2.5 rounded-lg items-center ${mode === 'signIn' ? 'bg-primary' : ''}`}
              >
                <Text
                  className={`font-semibold ${mode === 'signIn' ? 'text-white' : 'text-primaryDark'}`}
                >
                  Sign In
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setMode('signUp');
                  setLocalError('');
                  setError(null);
                }}
                className={`flex-1 py-2.5 rounded-lg items-center ${mode === 'signUp' ? 'bg-primary' : ''}`}
              >
                <Text
                  className={`font-semibold ${mode === 'signUp' ? 'text-white' : 'text-primaryDark'}`}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>

            {mode === 'signUp' && (
              <>
                <Text className="text-muted text-xs uppercase tracking-wide mb-1.5">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Optional"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  className="bg-background text-primaryDark px-4 py-3 rounded-xl mb-4 border border-black/5"
                />
              </>
            )}

            <Text className="text-muted text-xs uppercase tracking-wide mb-1.5">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="bg-background text-primaryDark px-4 py-3 rounded-xl mb-4 border border-black/5"
            />

            <Text className="text-muted text-xs uppercase tracking-wide mb-1.5">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              className="bg-background text-primaryDark px-4 py-3 rounded-xl mb-2 border border-black/5"
            />

            {displayError ? (
              <Text className="text-danger text-sm mt-2 mb-2">{displayError}</Text>
            ) : null}

            <Pressable
              onPress={onSubmit}
              disabled={loading}
              className={`mt-4 py-4 rounded-xl flex-row items-center justify-center gap-2 ${
                loading ? 'bg-primary/60' : 'bg-primary'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="leaf" size={20} color="#fff" />
                  <Text className="text-white font-bold text-lg">
                    {mode === 'signIn' ? 'Sign In' : 'Create Account'}
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function friendlyAuthError(code, fallback) {
  const map = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/email-already-in-use': 'Email already in use. Try signing in.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || fallback || 'Something went wrong. Try again.';
}
