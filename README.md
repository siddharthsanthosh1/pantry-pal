# PantryPal

A modern React Native Expo app for food expiration tracking and reducing waste.

## Quick start

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (SDK 52) on your phone, or press `i` / `a` for simulators.

> **Camera & notifications** work best on a physical device. iOS Simulator supports camera; notification scheduling requires a real device for full behavior.

## Features

- **Pantry** — Home tab with label scanning (Expo Camera), mock AI analysis, analytics card
- **Library** — Search, category filters, swipe-to-delete, urgency-colored cards
- **Calendar** — Expiration dates with green/yellow/red dots (`react-native-calendars`)
- **Recipes** — Suggestions prioritized by soonest-expiring pantry items
- **Notifications** — Local reminders 3 days, 1 day, and day-of expiration
- **Dark mode** — Toggle in any screen header

## Architecture

| Path | Purpose |
|------|---------|
| `services/mockLabelAnalyzer.js` | Mock AI — swap for real vision API |
| `services/storageService.js` | AsyncStorage persistence |
| `services/notificationService.js` | Expo Notifications scheduling |
| `data/mockRecipes.js` | Recipe catalog + matching logic |
| `contexts/PantryContext.jsx` | Shared pantry state |

## Tech stack

- Expo Router · NativeWind (Tailwind) · Reanimated · Gesture Handler
- Expo Camera · Expo Notifications · AsyncStorage

## Replace mock AI

Update `analyzeLabelImage()` in `services/mockLabelAnalyzer.js` to call your API. Keep the return shape:

```js
{ productName, expirationDate, category, estimatedDaysLeft }
```
