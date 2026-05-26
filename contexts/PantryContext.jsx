/**
 * Global pantry state — shared across tabs for live updates.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
import { getDaysLeft, getUrgency } from '../utils/urgency';
import * as storage from '../services/storageService';
import {
  scheduleItemNotifications,
  cancelItemNotifications,
  requestNotificationPermissions,
} from '../services/notificationService';

const PantryContext = createContext(null);

export function PantryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [savedThisMonth, setSavedThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [loaded, count] = await Promise.all([
      storage.loadPantryItems(),
      storage.getSavedThisMonth(),
    ]);
    setItems(enrichItems(loaded));
    setSavedThisMonth(count);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    requestNotificationPermissions();
  }, [refresh]);

  const addItem = useCallback(
    async ({ productName, expirationDate, category, estimatedDaysLeft }) => {
      const daysLeft = estimatedDaysLeft ?? getDaysLeft(expirationDate);
      const item = {
        id: Crypto.randomUUID(),
        productName,
        expirationDate,
        category,
        daysLeft,
        urgency: getUrgency(daysLeft),
        dateScanned: new Date().toISOString(),
        notificationIds: [],
      };

      const notificationIds = await scheduleItemNotifications(item);
      item.notificationIds = notificationIds;

      const next = await storage.addPantryItem(item);
      setItems(enrichItems(next));
      const count = await storage.getSavedThisMonth();
      setSavedThisMonth(count);
      return item;
    },
    []
  );

  const removeItem = useCallback(async (id) => {
    const target = items.find((i) => i.id === id);
    if (target?.notificationIds?.length) {
      await cancelItemNotifications(target.notificationIds);
    }
    const next = await storage.removePantryItem(id);
    setItems(enrichItems(next));
  }, [items]);

  return (
    <PantryContext.Provider
      value={{ items, loading, savedThisMonth, addItem, removeItem, refresh }}
    >
      {children}
    </PantryContext.Provider>
  );
}

function enrichItems(list) {
  return list.map((item) => {
    const daysLeft = getDaysLeft(item.expirationDate);
    return {
      ...item,
      daysLeft,
      urgency: getUrgency(daysLeft),
    };
  });
}

export function usePantry() {
  const ctx = useContext(PantryContext);
  if (!ctx) throw new Error('usePantry must be used within PantryProvider');
  return ctx;
}
