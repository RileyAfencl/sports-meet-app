import { DateRangePicker } from '@/components/daterangepicker';
import { SearchPostingCard } from '@/components/search-posting-card';
import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import { Posting } from '@/types/posting';
import { Sex } from '@/types/sex';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const currentUserAge = 27;

const currentUserSex: Sex = 'male';

const mockPostings: Posting[] = [
  { id: '1', 
    title: 'test posting one', 
    activity: 'Basketball', 
    dateTime: new Date('2026-07-17T18:30:00'),
    distanceMiles: 2.3,
    currentParticipants: 3,
    maxParticipants: 4,
    visibility: ['anyone'],
    ageRange: {
      min: 21,
      max: 35,
    },
   }
];

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

  const [radius, setRadius] = useState(5);

  const [hasSearched, setHasSearched] = useState(false);

  const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null);

  const filteredPostings = mockPostings
  .filter((posting) => {
    const isNotFull =
      posting.maxParticipants === null ||
      posting.currentParticipants < posting.maxParticipants;

  const matchesActivity =
    selectedActivities.length === 0 ||
    selectedActivities.includes(posting.activity);

  const matchesRadius =
      posting.distanceMiles <= radius;

  const postingDate = posting.dateTime.getTime();

  const matchesStartDate =
    startDate === null ||
    postingDate >= startDate.getTime();
  
  const matchesEndDate =
    endDate === null ||
    postingDate <= endDate.getTime();

  const userIsAgeEligible =
  currentUserAge >= posting.ageRange.min &&
  currentUserAge <= posting.ageRange.max;

  const userIsVisibilityEligible =
  posting.visibility.includes('anyone') ||
  posting.visibility.includes(currentUserSex);

  return (
      isNotFull &&
      userIsAgeEligible &&
      userIsVisibilityEligible &&
      matchesActivity &&
      matchesRadius &&
      matchesStartDate &&
      matchesEndDate
    );
  })
  .sort(
    (a, b) =>
      a.dateTime.getTime() - b.dateTime.getTime()
  );

  const handleSearch = () => {
    const searchPayload = {
      activities: selectedActivities,
      radiusMiles: radius,
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
       <SafeAreaView style={styles.safeArea}>
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

              <ThemedView style={styles.resultsGrid}>
                {filteredPostings.length === 0 ? (
                  <ThemedText style={styles.helperText}>
                    No postings matched your filters.
                  </ThemedText>
                ) : (
                  filteredPostings.map((posting) => (
                    <SearchPostingCard
                      key={posting.id}
                      posting={posting}
                      onPress={() => setSelectedPosting(posting)}
                    />
                  ))
                )}
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
       </SafeAreaView>
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
safeArea: {
  flex: 1,
  paddingHorizontal: Spacing.four,
  paddingBottom: 40,
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
  borderColor: '#000000',
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