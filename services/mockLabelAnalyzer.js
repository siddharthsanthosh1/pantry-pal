/**
 * Mock label analyzer — simulates AI vision extraction from a food label photo.
 *
 * Replace `analyzeLabelImage` with a real API call (e.g. OpenAI Vision, Google Cloud Vision)
 * while keeping the same return shape so the rest of the app stays unchanged.
 */

const MOCK_PRODUCTS = [
  {
    productName: 'Greek Yogurt',
    expirationDate: daysFromNow(8),
    category: 'Dairy',
  },
  {
    productName: 'Organic Strawberries',
    expirationDate: daysFromNow(2),
    category: 'Produce',
  },
  {
    productName: 'Whole Milk',
    expirationDate: daysFromNow(5),
    category: 'Dairy',
  },
  {
    productName: 'Sourdough Bread',
    expirationDate: daysFromNow(4),
    category: 'Bakery',
  },
  {
    productName: 'Chicken Breast',
    expirationDate: daysFromNow(3),
    category: 'Meat',
  },
  {
    productName: 'Baby Spinach',
    expirationDate: daysFromNow(6),
    category: 'Produce',
  },
  {
    productName: 'Cheddar Cheese',
    expirationDate: daysFromNow(12),
    category: 'Dairy',
  },
  {
    productName: 'Orange Juice',
    expirationDate: daysFromNow(9),
    category: 'Beverages',
  },
];

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function getDaysLeft(expirationDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expirationDate + 'T00:00:00');
  return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

/**
 * Simulates network + AI processing delay, then returns structured label data.
 * @param {string} _imageUri - Local file URI from camera (passed through for future API use)
 * @returns {Promise<{ productName, expirationDate, category, estimatedDaysLeft }>}
 */
export async function analyzeLabelImage(_imageUri) {
  const delay = 1800 + Math.random() * 1200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const pick = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
  const estimatedDaysLeft = getDaysLeft(pick.expirationDate);

  return {
    productName: pick.productName,
    expirationDate: pick.expirationDate,
    category: pick.category,
    estimatedDaysLeft,
  };
}
