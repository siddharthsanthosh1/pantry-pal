/**
 * Urgency helpers — shared across Library, Calendar, and Recipes.
 * Thresholds: safe >7 days, close 3–7 days, soon ≤2 days.
 */

export const URGENCY = {
  SAFE: 'safe',
  CLOSE: 'close',
  SOON: 'soon',
};

export const URGENCY_COLORS = {
  safe: '#52B788',
  close: '#F4A261',
  soon: '#E76F51',
};

export const URGENCY_LABELS = {
  safe: 'Safe',
  close: 'Use Soon',
  soon: 'Expires Soon',
};

/** Days until expiration from today (local midnight). */
export function getDaysLeft(expirationDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expirationDate + 'T00:00:00');
  const diff = exp.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getUrgency(daysLeft) {
  if (daysLeft <= 2) return URGENCY.SOON;
  if (daysLeft <= 7) return URGENCY.CLOSE;
  return URGENCY.SAFE;
}

export function getUrgencyColor(urgency) {
  return URGENCY_COLORS[urgency] || URGENCY_COLORS.safe;
}

export function formatExpirationDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function toDateKey(isoDate) {
  return isoDate;
}
