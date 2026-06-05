import { useMemo } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';
import { usePantry } from '../../contexts/PantryContext';
import { useTheme } from '../../contexts/ThemeContext';

const RECIPES = {
  beef: [
    {
      id: 1,
      name: 'Beef Stir Fry',
      time: '25 min',
      difficulty: 'Easy',
      description: 'Quick stir fry with vegetables and soy sauce',
      ingredients: ['Beef', 'Bell peppers', 'Onions', 'Soy sauce', 'Garlic'],
    },
    {
      id: 2,
      name: 'Beef Tacos',
      time: '30 min',
      difficulty: 'Easy',
      description: 'Seasoned ground beef with fresh toppings',
      ingredients: ['Beef', 'Tortillas', 'Lettuce', 'Tomatoes', 'Cheese'],
    },
    {
      id: 3,
      name: 'Beef Stew',
      time: '2 hrs',
      difficulty: 'Medium',
      description: 'Hearty stew with potatoes and carrots',
      ingredients: ['Beef', 'Potatoes', 'Carrots', 'Onions', 'Beef broth'],
    },
    {
      id: 4,
      name: 'Beef Burrito Bowl',
      time: '35 min',
      difficulty: 'Easy',
      description: 'Rice bowl with seasoned beef and toppings',
      ingredients: ['Beef', 'Rice', 'Beans', 'Corn', 'Salsa'],
    },
  ],
  strawberries: [
    {
      id: 5,
      name: 'Strawberry Smoothie',
      time: '5 min',
      difficulty: 'Easy',
      description: 'Refreshing smoothie with yogurt and honey',
      ingredients: ['Strawberries', 'Yogurt', 'Honey', 'Milk', 'Ice'],
    },
    {
      id: 6,
      name: 'Strawberry Salad',
      time: '15 min',
      difficulty: 'Easy',
      description: 'Fresh salad with spinach and balsamic',
      ingredients: ['Strawberries', 'Spinach', 'Feta cheese', 'Balsamic', 'Nuts'],
    },
    {
      id: 7,
      name: 'Strawberry Shortcake',
      time: '45 min',
      difficulty: 'Medium',
      description: 'Classic dessert with whipped cream',
      ingredients: ['Strawberries', 'Flour', 'Sugar', 'Butter', 'Heavy cream'],
    },
    {
      id: 8,
      name: 'Strawberry Jam',
      time: '30 min',
      difficulty: 'Easy',
      description: 'Homemade jam perfect for toast',
      ingredients: ['Strawberries', 'Sugar', 'Lemon juice', 'Pectin'],
    },
  ],
};

export default function RecipesScreen() {
  const { items } = usePantry();
  const { isDark } = useTheme();
  const bg = isDark ? 'bg-darkBg' : 'bg-background';
  const cardBg = isDark ? 'bg-darkCard' : 'bg-white';

  const expiredItems = useMemo(() => {
    return items.filter((item) => item.urgency === 'expired' || item.urgency === 'critical');
  }, [items]);

  const availableRecipes = useMemo(() => {
    const recipes = [];
    expiredItems.forEach((item) => {
      const productName = item.productName.toLowerCase();
      if (productName.includes('beef') || productName.includes('meat')) {
        recipes.push(...RECIPES.beef);
      } else if (productName.includes('strawberry') || productName.includes('berry')) {
        recipes.push(...RECIPES.strawberries);
      }
    });
    return recipes;
  }, [expiredItems]);

  return (
    <View className={`flex-1 ${bg}`}>
      <Header
        title="Recipes"
        subtitle={`Use your expiring food${expiredItems.length > 0 ? ` (${expiredItems.length} items)` : ''}`}
      />

      <ScrollView
        className="flex-1 px-5 pt-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {expiredItems.length === 0 ? (
          <EmptyState
            message="No expiring food to use."
            hint="Add food items that are about to expire to get recipe suggestions."
          />
        ) : (
          <>
            <View className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-darkCard' : 'bg-accent/20'}`}>
              <View className="flex-row items-center mb-3">
                <Ionicons name="alert-circle" size={20} color="#E76F51" />
                <Text className={`ml-2 font-semibold ${isDark ? 'text-white' : 'text-primaryDark'}`}>
                  Expiring items
                </Text>
              </View>
              {expiredItems.map((item) => (
                <View key={item.id} className="flex-row items-center py-2 border-b border-black/5 last:border-0">
                  <View className="w-2 h-2 rounded-full bg-red-500 mr-3" />
                  <Text className={`flex-1 ${isDark ? 'text-gray-300' : 'text-muted'}`}>
                    {item.productName}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-muted'}`}>
                    {item.expirationDate}
                  </Text>
                </View>
              ))}
            </View>

            {availableRecipes.length === 0 ? (
              <EmptyState
                message="No recipes found for your expiring items."
                hint="Try adding more specific food items."
              />
            ) : (
              <>
                <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-primaryDark'}`}>
                  Suggested recipes
                </Text>
                {availableRecipes.map((recipe, i) => (
                  <Animated.View key={recipe.id} entering={FadeIn.delay(i * 100)} className="mb-4">
                    <Pressable
                      className={`${cardBg} rounded-2xl p-4 border border-black/5`}
                      style={{ elevation: 2 }}
                    >
                      <View className="flex-row items-start justify-between mb-2">
                        <View className="flex-1">
                          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-primaryDark'}`}>
                            {recipe.name}
                          </Text>
                          <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-muted'}`}>
                            {recipe.description}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-4 mb-3">
                        <View className="flex-row items-center">
                          <Ionicons name="time-outline" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
                          <Text className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-muted'}`}>
                            {recipe.time}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons name="bar-chart-outline" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
                          <Text className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-muted'}`}>
                            {recipe.difficulty}
                          </Text>
                        </View>
                      </View>

                      <View className={`rounded-xl p-3 ${isDark ? 'bg-darkBg' : 'bg-gray-50'}`}>
                        <Text className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-muted'}`}>
                          Ingredients
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {recipe.ingredients.map((ing, idx) => (
                            <View
                              key={idx}
                              className={`px-3 py-1 rounded-full ${
                                isDark ? 'bg-primaryLight/20' : 'bg-primary/10'
                              }`}
                            >
                              <Text className={`text-xs ${isDark ? 'text-primaryLight' : 'text-primary'}`}>
                                {ing}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
