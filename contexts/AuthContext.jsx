/**
 * Firebase Authentication state for the whole app.
 */

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { isFirebaseFullyConfigured } from '../config/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    setError(null);
    if (!isFirebaseFullyConfigured()) {
      throw new Error('Add EXPO_PUBLIC_FIREBASE_APP_ID to .env (Firebase Console → Web app)');
    }
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    return cred.user;
  };

  const signUp = async (email, password, displayName) => {
    setError(null);
    if (!isFirebaseFullyConfigured()) {
      throw new Error('Add EXPO_PUBLIC_FIREBASE_APP_ID to .env (Firebase Console → Web app)');
    }
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (displayName?.trim()) {
      await updateProfile(cred.user, { displayName: displayName.trim() });
    }
    return cred.user;
  };

  const signOut = async () => {
    setError(null);
    await firebaseSignOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      error,
      setError,
      signIn,
      signUp,
      signOut,
      isConfigured: isFirebaseFullyConfigured(),
    }),
    [user, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
