/**
 * Firebase config for Pantry Pal (pantry-pal-b88a7).
 *
 * 1. Firebase Console → Project Settings → Your apps → Web app
 * 2. Copy apiKey + appId into .env (see .env.example)
 * 3. Authentication → Sign-in method → Enable Email/Password
 */

import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const firebaseConfig = {
  apiKey: extra.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain:
    extra.firebaseAuthDomain ||
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'pantry-pal-b88a7.firebaseapp.com',
  projectId:
    extra.firebaseProjectId ||
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ||
    'pantry-pal-b88a7',
  storageBucket:
    extra.firebaseStorageBucket ||
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'pantry-pal-b88a7.firebasestorage.app',
  messagingSenderId:
    extra.firebaseMessagingSenderId ||
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    '758882515581',
  appId: extra.firebaseAppId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey);
}

export function isFirebaseFullyConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.appId);
}
