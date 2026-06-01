import { useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import Header from '../../components/Header';
import FoodCard from '../../components/FoodCard';
import EmptyState from '../../components/EmptyState';
import { usePantry } from '../../contexts/PantryContext';
import { useTheme } from '../../contexts/ThemeContext';

const CATEGORIES = ['All', 'Dairy', 'Produce', 'Meat', 'Bakery', 'Beverages', 'Frozen', 'Pantry'];

export default function LibraryScreen() {
  const { items, removeItem } = usePantry();
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !search ||
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || item.category === category;
      return matchSearch && matchCat;
    });
  }, [items, search, category]);

  const bg = isDark ? 'bg-darkBg' : 'bg-background';
  const inputBg = isDark ? 'bg-darkCard text-white' : 'bg-white text-primaryDark';
  const chipActive = isDark ? 'bg-primaryLight' : 'bg-primary';
  const chipIdle = isDark ? 'bg-darkCard' : 'bg-white';

  return (
    <View className={`flex-1 ${bg}`}>
      <Header title="Library" subtitle={`${items.length} items tracked`} />

      <View className="px-5 pt-4">
        <TextInput
          placeholder="Search foods..."
          placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
          value={search}
          onChangeText={setSearch}
          className={`${inputBg} rounded-xl px-4 py-3 text-base border border-black/5`}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ gap: 8, paddingRight: 8 }}
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full ${active ? chipActive : chipIdle}`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    active ? 'text-white' : isDark ? 'text-gray-300' : 'text-muted'
                  }`}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <EmptyState
            icon="search-outline"
            message={items.length === 0 ? 'No foods scanned yet.' : 'No matches found.'}
            hint={
              items.length === 0
                ? 'Go to Pantry and scan your first label.'
                : 'Try a different search or filter.'
            }
          />
        ) : (
          filtered.map((item, i) => (
            <FoodCard key={item.id} item={item} index={i} onDelete={removeItem} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
