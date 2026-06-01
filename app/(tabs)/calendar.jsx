import { useMemo, useState } from 'react';
import { View, ScrollView, Text, Modal, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../../components/Header';
import ScreenBackground from '../../components/ScreenBackground';
import { FoodCardCompact } from '../../components/FoodCard';
import EmptyState from '../../components/EmptyState';
import { usePantry } from '../../contexts/PantryContext';
import { getUrgencyColor } from '../../utils/urgency';

export default function CalendarScreen() {
  const { items } = usePantry();
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const markedDates = useMemo(() => {
    const marks = {};
    for (const item of items) {
      const key = item.expirationDate;
      const color = getUrgencyColor(item.urgency);
      if (!marks[key]) {
        marks[key] = { dots: [], marked: true };
      }
      const existing = marks[key].dots || [];
      if (existing.length < 3) {
        marks[key].dots = [...existing, { key: item.id, color }];
      }
    }
    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        selected: true,
        selectedColor: '#40916C',
      };
    }
    return marks;
  }, [items, selectedDate]);

  const dayItems = useMemo(
    () => items.filter((i) => i.expirationDate === selectedDate),
    [items, selectedDate]
  );

  const calTheme = {
    backgroundColor: 'transparent',
    calendarBackground: '#FFFFFF',
    textSectionTitleColor: '#52796F',
    selectedDayBackgroundColor: '#40916C',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#2D6A4F',
    dayTextColor: '#1B4332',
    textDisabledColor: '#D1D5DB',
    dotColor: '#52B788',
    selectedDotColor: '#ffffff',
    arrowColor: '#2D6A4F',
    monthTextColor: '#1B4332',
    textDayFontWeight: '500',
    textMonthFontWeight: '700',
  };

  return (
    <ScreenBackground>
      <Header title="Calendar" subtitle="Expiration dates at a glance" />

      <View className="px-4 pt-4">
        {items.length === 0 ? (
          <EmptyState
            message="No expiration dates yet."
            hint="Scan foods to populate your calendar."
            onGradient
          />
        ) : (
          <Calendar
            markingType="multi-dot"
            markedDates={markedDates}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setModalVisible(true);
            }}
            theme={calTheme}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              elevation: 2,
            }}
          />
        )}

        <View className="flex-row justify-center gap-6 mt-4">
          {[
            { label: 'Safe', color: '#52B788' },
            { label: 'Close', color: '#F4A261' },
            { label: 'Soon', color: '#E76F51' },
          ].map((l) => (
            <View key={l.label} className="flex-row items-center gap-1.5">
              <View className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
              <Text className="text-white/85 text-sm">{l.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            className="bg-white rounded-t-3xl p-5 max-h-[70%]"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />
            <Text className="text-xl font-bold mb-1 text-primaryDark">
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </Text>
            <Text className="mb-4 text-muted">
              {dayItems.length} item{dayItems.length !== 1 ? 's' : ''} expiring
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {dayItems.length === 0 ? (
                <Text className="text-muted">Nothing expiring on this day.</Text>
              ) : (
                dayItems.map((item) => <FoodCardCompact key={item.id} item={item} />)
              )}
            </ScrollView>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-primary mt-4 py-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold">Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenBackground>
  );
}
