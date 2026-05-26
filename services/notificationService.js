/**
 * Local expiration reminders — 3 days before, 1 day before, and day-of.
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermissions() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  let final = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    final = status;
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('expiration', {
      name: 'Expiration Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  return final === 'granted';
}

function daysBeforeDate(isoDate, offsetDays) {
  const d = new Date(isoDate + 'T09:00:00');
  d.setDate(d.getDate() - offsetDays);
  return d;
}

function emojiForCategory(category) {
  const map = {
    Dairy: '🥛',
    Produce: '🍓',
    Meat: '🍗',
    Bakery: '🍞',
    Frozen: '🧊',
    Beverages: '🥤',
    Pantry: '🥫',
  };
  return map[category] || '🥗';
}

/**
 * Schedules three local notifications for a pantry item.
 * Call after adding an item; cancel via cancelItemNotifications when deleting.
 */
export async function scheduleItemNotifications(item) {
  const granted = await requestNotificationPermissions();
  if (!granted) return [];

  const emoji = emojiForCategory(item.category);
  const name = item.productName;
  const ids = [];

  const schedules = [
    {
      offset: 3,
      title: `${name} expires in 3 days ${emoji}`,
      body: 'Plan a meal soon — check Recipes for ideas!',
    },
    {
      offset: 1,
      title: `Your ${name.toLowerCase()} expires tomorrow ${emoji}`,
      body: 'Use them tonight! Here are recipe ideas.',
    },
    {
      offset: 0,
      title: `${name} expires today ${emoji}`,
      body: 'Use or freeze today to reduce waste.',
    },
  ];

  for (const s of schedules) {
    const triggerDate = daysBeforeDate(item.expirationDate, s.offset);
    if (triggerDate <= new Date()) continue;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: s.title,
        body: s.body,
        data: { itemId: item.id },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
        channelId: Platform.OS === 'android' ? 'expiration' : undefined,
      },
    });
    ids.push(id);
  }

  return ids;
}

export async function cancelItemNotifications(notificationIds = []) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}
