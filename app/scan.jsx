import { useRef, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { analyzeLabelImage } from '../services/mockLabelAnalyzer';
import { usePantry } from '../contexts/PantryContext';

/**
 * Full-screen camera + mock AI analysis flow.
 */
export default function ScanScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [phase, setPhase] = useState('camera');
  const [photoUri, setPhotoUri] = useState(null);
  const [result, setResult] = useState(null);
  const { addItem } = usePantry();

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-8">
        <Ionicons name="camera-outline" size={64} color="#fff" />
        <Text className="text-white text-lg text-center mt-4 font-semibold">
          Camera access needed to scan labels
        </Text>
        <Pressable onPress={requestPermission} className="bg-primary mt-6 px-8 py-3 rounded-full">
          <Text className="text-white font-bold">Grant Permission</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-white/70">Cancel</Text>
        </Pressable>
      </View>
    );
  }

  const capture = async () => {
    if (!cameraRef.current) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    setPhotoUri(photo.uri);
    setPhase('analyzing');

    try {
      const analysis = await analyzeLabelImage(photo.uri);
      setResult({ ...analysis, imageUri: photo.uri });
      setPhase('result');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setPhase('camera');
      setPhotoUri(null);
    }
  };

  const saveAndClose = async () => {
    if (!result) return;
    await addItem({
      productName: result.productName,
      expirationDate: result.expirationDate,
      category: result.category,
      estimatedDaysLeft: result.estimatedDaysLeft,
    });
    router.replace('/(tabs)/library');
  };

  return (
    <View className="flex-1 bg-black">
      {phase === 'camera' && (
        <>
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
          <View className="absolute top-14 left-5 right-5 flex-row justify-between items-center">
            <Pressable onPress={() => router.back()} className="w-11 h-11 rounded-full bg-black/50 items-center justify-center">
              <Ionicons name="close" size={28} color="#fff" />
            </Pressable>
            <Text className="text-white font-bold text-lg">Scan Label</Text>
            <View className="w-11" />
          </View>
          <View className="absolute inset-x-8 top-1/3 border-2 border-white/60 rounded-2xl h-48" />
          <View className="absolute bottom-12 inset-x-0 items-center">
            <Pressable
              onPress={capture}
              className="w-20 h-20 rounded-full border-4 border-white items-center justify-center bg-white/20"
            >
              <View className="w-14 h-14 rounded-full bg-white" />
            </Pressable>
            <Text className="text-white/80 mt-3 text-sm">Align label inside frame</Text>
          </View>
        </>
      )}

      {phase === 'analyzing' && (
        <Animated.View entering={FadeIn} className="flex-1 items-center justify-center px-8">
          <ActivityIndicator size="large" color="#40916C" />
          <Text className="text-white text-2xl font-bold mt-6">Analyzing Label…</Text>
          <Text className="text-white/60 text-center mt-2">
            Extracting product name, expiration date, and category
          </Text>
        </Animated.View>
      )}

      {phase === 'result' && result && (
        <Animated.View entering={FadeInUp} className="flex-1 justify-center px-6">
          <View className="bg-white rounded-3xl p-6">
            <View className="w-14 h-14 rounded-full bg-safe/20 items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={36} color="#52B788" />
            </View>
            <Text className="text-primaryDark text-2xl font-bold">{result.productName}</Text>
            <Text className="text-muted mt-1">{result.category}</Text>
            <View className="mt-4 bg-accent/50 rounded-xl p-4">
              <Text className="text-primaryDark font-semibold">Expires</Text>
              <Text className="text-primary text-lg font-bold mt-1">
                {result.expirationDate}
              </Text>
              <Text className="text-muted mt-1">
                ~{result.estimatedDaysLeft} days remaining
              </Text>
            </View>
            <Pressable onPress={saveAndClose} className="bg-primary mt-6 py-4 rounded-xl items-center">
              <Text className="text-white font-bold text-lg">Save to Pantry</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setPhase('camera');
                setResult(null);
                setPhotoUri(null);
              }}
              className="mt-3 py-3 items-center"
            >
              <Text className="text-muted font-semibold">Scan Again</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
