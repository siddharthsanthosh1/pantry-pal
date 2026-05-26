/**
 * Placeholder images for items added manually (no label photo).
 * Uses stable remote images for demo; swap to bundled assets later.
 */

const FALLBACK =
  'https://images.unsplash.com/photo-1543363136-5f7db59d9d97?w=400';

const BY_CATEGORY = {
  Dairy: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
  Produce: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
  Meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
  Bakery: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
  Frozen: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400',
  Beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
  Pantry: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400',
};

export function getPlaceholderImageUri(category) {
  return BY_CATEGORY[category] || FALLBACK;
}

