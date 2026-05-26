/**
 * Local persistence via AsyncStorage — swap for SQLite / Supabase later.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PANTRY_KEY = '@pantrypal/pantry_items';
const STATS_KEY = '@pantrypal/stats';

export async function loadPantryItems() {
  try {
    const raw = await AsyncStorage.getItem(PANTRY_KEY);
    if (!raw) return [];
    // Strip image URIs so the app runs in "no images" mode even
    // for items that were saved before this change.
    const parsed = JSON.parse(raw);
    const sanitized = parsed.map(({ imageUri, ...rest }) => rest);
    const hadAnyImages = parsed.some((i) => Boolean(i?.imageUri));
    if (hadAnyImages) {
      await AsyncStorage.setItem(PANTRY_KEY, JSON.stringify(sanitized));
    }
    return sanitized;
  } catch {
    return [];
  }
}

export async function savePantryItems(items) {
  await AsyncStorage.setItem(PANTRY_KEY, JSON.stringify(items));
}

export async function addPantryItem(item) {
  const items = await loadPantryItems();
  const next = [item, ...items];
  await savePantryItems(next);
  await incrementSavedCount();
  return next;
}

export async function removePantryItem(id) {
  const items = await loadPantryItems();
  const next = items.filter((i) => i.id !== id);
  await savePantryItems(next);
  return next;
}

export async function getSavedThisMonth() {
  try {
    const raw = await AsyncStorage.getItem(STATS_KEY);
    const stats = raw ? JSON.parse(raw) : { month: currentMonthKey(), count: 0 };
    if (stats.month !== currentMonthKey()) {
      return 0;
    }
    return stats.count;
  } catch {
    return 0;
  }
}

async function incrementSavedCount() {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  const key = currentMonthKey();
  let stats = raw ? JSON.parse(raw) : { month: key, count: 0 };
  if (stats.month !== key) {
    stats = { month: key, count: 0 };
  }
  stats.count += 1;
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}`;
}
