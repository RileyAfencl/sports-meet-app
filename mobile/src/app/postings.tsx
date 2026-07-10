import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { DateRangePicker } from '@/components/daterangepicker';
import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

const visibilityOptions = ['Men', 'Women', 'Other', 'Anyone'];

export default function PostingsScreen() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [activitySearch, setActivitySearch] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const filteredActivities = activityOptions.filter(
    (activity) =>
      activity.toLowerCase().includes(activitySearch.toLowerCase()) &&
      !selectedActivities.includes(activity)
  );

  const shouldShowActivityResults = activitySearch.trim().length > 0;

  const [visibilityPreferences, setVisibilityPreferences] = useState<string[]>([]);

  const [radius, setRadius] = useState(5);

  const [ageRange, setAgeRange] = useState([18, 80]);
  const [minAgeText, setMinAgeText] = useState('18');
  const [maxAgeText, setMaxAgeText] = useState('80');

  const [hasSearched, setHasSearched] = useState(false);

  const syncAgeRange = (values: number[]) => {
    setAgeRange(values);
    setMinAgeText(String(values[0]));
    setMaxAgeText(String(values[1]));
  };

  const handleSearch = () => {
    const searchPayload = {
      activities: selectedActivities,
      visibilityPreferences,
      radiusMiles: radius,
      ageRange: {
        min: ageRange[0],
        max: ageRange[1],
      },
      dateRange: {
        start: startDate?.toISOString() ?? null,
        end: endDate?.toISOString() ?? null,
      },
    };

    console.log(searchPayload);
    setHasSearched(true);
  };

  const toggleArrayOption = (
    value: string,
    currentValues: string[],
    setValues: (values: string[]) => void,
    allOptions: string[],
    defaultValue: string
  ) => {
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    if (nextValues.length === allOptions.length) {
      setValues([defaultValue]);
      return;
    }

    if (currentValues.includes(defaultValue)) {
      setValues([value]);
      return;
    }

    if (nextValues.length === 0) {
      setValues([defaultValue]);
      return;
    }

    setValues(nextValues);
  };

  return (
    <ThemedView style={styles.appShell}>
      <Sidebar />

      <ScrollView style={styles.mainContent}>
        <ThemedView style={styles.contentContainer}>
          <ThemedText type="title" style={styles.pageTitle}>
            Posting Board
          </ThemedText>

          <ThemedText style={styles.pageDescription}>
            Search for open activity postings nearby and RSVP to join.
          </ThemedText>

          <ThemedText style={styles.sectionLabel}>Activity Filters</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Search activities"
            placeholderTextColor="#888"
            value={activitySearch}
            onChangeText={setActivitySearch}
          />

          {shouldShowActivityResults && (
            <ThemedView style={styles.tagContainer}>
              {filteredActivities.map((activity) => (
                <Pressable
                  key={activity}
                  style={styles.tagBubble}
                  onPress={() => {
                    setSelectedActivities([...selectedActivities, activity]);
                    setActivitySearch('');
                  }}
                >
                  <ThemedText style={styles.tagText}>{activity}</ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          )}

          <ThemedText style={styles.sectionLabel}>
            Current Activity Filters
          </ThemedText>

          <ThemedView style={styles.tagContainer}>
            {selectedActivities.map((activity) => (
              <Pressable
                key={activity}
                style={styles.tagBubble}
                onPress={() =>
                  setSelectedActivities(
                    selectedActivities.filter(
                      (selectedActivity) => selectedActivity !== activity
                    )
                  )
                }
              >
                <ThemedText style={styles.tagText}>{activity}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>

          <ThemedText style={styles.sectionLabel}>Posting Visibility</ThemedText>
            <ThemedView style={styles.optionRow}>
                {visibilityOptions.map((option) => (
                    <Pressable
                        key={option}
                        style={[
                          styles.optionButton,
                          visibilityPreferences.includes(option) &&
                            styles.optionButtonActive,
                        ]}
                        onPress={() =>
                          option === 'Anyone'
                            ? setVisibilityPreferences(['Anyone'])
                            : toggleArrayOption(
                                option,
                                visibilityPreferences,
                                setVisibilityPreferences,
                                ['Men', 'Women', 'Other'],
                                'Anyone'
                              )
                        }
                      >
                        <ThemedText style={styles.optionButtonText}>
                          {option}
                        </ThemedText>
                    </Pressable>
                    ))}
                </ThemedView>
          
                  <ThemedText style={styles.helperText}>
                    Visibility determines who may see your posting. In the posting board, visibility controls only determine who can see and view your posting. Direct Message permissions are unchanged.  
                  </ThemedText>
          
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <ThemedText style={styles.sectionLabel}>Radius</ThemedText>

          <ThemedView style={styles.radiusHeader}>
            <ThemedText style={styles.helperText}>Search Radius</ThemedText>
            <ThemedText style={styles.helperText}>{radius} miles</ThemedText>
          </ThemedView>

          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#8b5cf6"
            maximumTrackTintColor="#555"
            thumbTintColor="#8b5cf6"
          />

          <ThemedText style={styles.sectionLabel}>Age Range</ThemedText>

          <ThemedView style={styles.ageInputRow}>
            <ThemedView>
              <ThemedText style={styles.helperText}>Min Age</ThemedText>
              <TextInput
                style={styles.ageInput}
                value={minAgeText}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const digitsOnly = text.replace(/[^0-9]/g, '');
                  setMinAgeText(digitsOnly);

                  if (digitsOnly === '') return;

                  const num = Number(digitsOnly);

                  if (num >= 18 && num <= ageRange[1]) {
                    setAgeRange([num, ageRange[1]]);
                  }
                }}
                onBlur={() => {
                  let num = Number(minAgeText);

                  if (!minAgeText || isNaN(num)) {
                    num = 18;
                  }

                  num = Math.max(18, Math.min(num, ageRange[1]));

                  setAgeRange([num, ageRange[1]]);
                  setMinAgeText(String(num));
                }}
              />
            </ThemedView>

            <ThemedView>
              <ThemedText style={styles.helperText}>Max Age</ThemedText>
              <TextInput
                style={styles.ageInput}
                value={maxAgeText}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const digitsOnly = text.replace(/[^0-9]/g, '');
                  setMaxAgeText(digitsOnly);

                  if (digitsOnly === '') return;

                  const num = Number(digitsOnly);

                  if (num >= ageRange[0] && num <= 80) {
                    setAgeRange([ageRange[0], num]);
                  }
                }}
                onBlur={() => {
                  let num = Number(maxAgeText);

                  if (!maxAgeText || isNaN(num)) {
                    num = 80;
                  }

                  num = Math.max(ageRange[0], Math.min(num, 80));

                  setAgeRange([ageRange[0], num]);
                  setMaxAgeText(String(num));
                }}
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.ageSliderContainer}>
              <MultiSlider
                sliderLength={320}
                values={ageRange}
                min={18}
                max={80}
                step={1}
                onValuesChange={syncAgeRange}
                selectedStyle={{
                  backgroundColor: '#8b5cf6',
                }}
                unselectedStyle={{
                  backgroundColor: '#555',
                }}
                markerStyle={{
                  backgroundColor: '#8b5cf6',
                  height: 20,
                  width: 20,
                }}
              />
            </ThemedView>

          <Pressable
            style={[
              styles.searchButton,
              hasSearched && styles.buttonDisabled,
            ]}
            disabled={hasSearched}
            onPress={handleSearch}
          >
            <ThemedText style={styles.searchButtonText}>
              {hasSearched ? 'Results Showing' : 'Search Postings'}
            </ThemedText>
          </Pressable>

          {hasSearched && (
            <ThemedView>
              <ThemedView style={styles.sectionHeader}>
                <ThemedText style={styles.sectionLabel}>Results</ThemedText>

                <Pressable
                  style={styles.clearResultsButton}
                  onPress={() => setHasSearched(false)}
                >
                  <ThemedText>Clear Results</ThemedText>
                </Pressable>
              </ThemedView>

              <ThemedText style={styles.helperText}>
                Posting results will render here.
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
appShell: {
  flex: 1,
  flexDirection: 'row',
},
mainContent: {
  flex: 1,
  padding: Spacing.four,
},
sectionLabel: {
  marginTop: 16,
  marginBottom: 8,
  fontWeight: '700',
},
input: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#000000',
},
optionRow: {
  flexDirection: 'row',
  gap: Spacing.two,
},
optionButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingVertical: 12,
  alignItems: 'center',
},
helperText: {
  fontSize: 12,
  opacity: 0.7,
},
searchButton: {
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius: 8,
  paddingVertical: 12,
  marginTop: 20,
  alignSelf: 'center',
  alignItems: 'center',
  minWidth: 300,
},
searchButtonText: {
  fontWeight: '700',
},
tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: Spacing.two,
  marginTop: 8,
},
tagBubble: {
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius: 999,
  paddingHorizontal: 14,
  paddingVertical: 8,
},
tagText: {
  fontSize: 14,
},
sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: Spacing.two,
},
profileActivityButton: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginTop: 10
},
profileActivityButtonActive: {
  borderColor: '#8b5cf6',
  borderWidth: 2,
},
profileActivityButtonText: {
  fontSize: 11,
  fontWeight: '600',
},
selectedFilterRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: Spacing.two,
  marginTop: 8,
},
selectedFilterLabel: {
  fontWeight: '700',
  fontSize: 13,
},
contentContainer: {
  width: '100%',
  maxWidth: 600,
  alignSelf: 'center',
},
pageDescription: {
  marginTop: 4,
  textAlign: 'center',
  marginBottom: 24,
  opacity: 0.7,
},
pageTitle: {
  textAlign: 'center',
  marginBottom: 24,
},
optionButtonActive: {
  borderColor: '#8b5cf6',
  borderWidth: 2,
},
optionButtonText: {
    fontWeight: '700',
},
buttonDisabled: {
  opacity: 0.5,
},
radiusHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
},
slider: {
  width: '100%',
  height: 40,
  marginBottom: 20,
},
ageInputRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
  marginRight:4,
  marginLeft:4,
},
ageInput: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 6,
  color: '#000000',
  width: 72,
  textAlign: 'center',
},
ageSliderContainer: {
  alignItems: 'center',
  alignSelf: 'stretch',
  marginTop: 8,
},
clearResultsButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingVertical: 2,
  alignItems: 'center',
  maxWidth: 100,
  marginTop: 5,
},
resultsGrid: {
    flexDirection: 'row',
  flexWrap: 'wrap',
  gap: Spacing.two,
  marginTop: 12,
},

});