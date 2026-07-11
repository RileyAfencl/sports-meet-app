import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';

    return date.toLocaleDateString();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  return (
    <ThemedView>
      <ThemedText style={styles.sectionLabel}>Date Range</ThemedText>

      <ThemedView style={styles.dateInputRow}>
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <ThemedText style={styles.dateButtonLabel}>Start</ThemedText>
          <ThemedText>{formatDate(startDate)}</ThemedText>
        </Pressable>

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <ThemedText style={styles.dateButtonLabel}>End</ThemedText>
          <ThemedText>{formatDate(endDate)}</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedText style={styles.helperText}>
        Search postings up to 14 days out.
      </ThemedText>

      {showStartPicker && (
        <DateTimePicker
          value={startDate ?? today}
          mode="date"
          minimumDate={today}
          maximumDate={maxDate}
          onValueChange={(_, selectedDate) => {
            setShowStartPicker(false);

            if (selectedDate) {
              onStartDateChange(selectedDate);

              if (endDate && selectedDate > endDate) {
                onEndDateChange(selectedDate);
              }
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate ?? startDate ?? today}
          mode="date"
          minimumDate={startDate ?? today}
          maximumDate={maxDate}
          onValueChange={(_, selectedDate) => {
            setShowEndPicker(false);

            if (selectedDate) {
              onEndDateChange(selectedDate);
            }
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
sectionLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '700',
},
  dateInputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
},
dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
},
dateButtonLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
},
helperText: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 6,
},
});