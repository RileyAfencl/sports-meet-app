import { SearchProfileCard } from '@/components/search-profile-card';
import { SearchProfileModal } from '@/components/search-profile-modal';
import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import type { Profile } from '@/types/profile';
import { Sex, VisibilityPreference } from '@/types/sex';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timeOptions = [ 
    'Morning',
    'Afternoon',
    'Evening',   
]

const currentUserSex: Sex = 'other';

const currentUserVisibilityPreferences: VisibilityPreference[] = [
  'anyone',
];

const mockProfiles: Profile[] = [
  {
    id: '1',
    firstName: 'John',
    lastInitial: 'F',
    age: 27,
    sex: 'male',
    activities: [ 'Lifting',
                  'Running',
                  'Pickleball',
                  'Hiking',
                  'Basketball',
                  'Swimming',
                  'Golf',
                ],
    preferredTimes: ['Morning', 'Evening'],
    visibilityPreferences: ['anyone'],
    distanceMiles: 2.3,
    aboutMe:
      'I am looking for consistent activity partners who are reliable, easygoing, and interested in getting outside or training a few times a week. I usually prefer weekday evenings and weekends, and I am open to both casual sessions and more structured workouts depending on the activity. xxxxxxxxxxxxxxx',
    matchCount: 2,
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastInitial: 'M',
    age: 24,
    sex: 'female',
    activities: ['Pickleball', 'Hiking'],
    visibilityPreferences: ['female'],
    distanceMiles: 4.7,
    preferredTimes: ['Any'],
  },
  {
    id: '3',
    firstName: 'Alex',
    lastInitial: 'T',
    age: 31,
    sex: 'other',
    activities: ['Lifting', 'Basketball'],
    preferredTimes: ['Any'],
    distanceMiles: 8.2,
    visibilityPreferences: ['other'],
  },
];

export default function HomeScreen() {
    const [activitySearch, setActivitySearch] = useState('');
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const filteredActivities = activityOptions.filter((activity) =>
    activity.toLowerCase().includes(activitySearch.toLowerCase()) &&
    !selectedActivities.includes(activity)
    );

    const shouldShowActivityResults = activitySearch.trim().length > 0;

    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [useProfileTimePreferences, setUseProfileTimePreferences] = useState(false);

    const [useProfileActivities, setUseProfileActivities] = useState(false);
    const [radius, setRadius] = useState(5);
    const [ageRange, setAgeRange] = useState([18, 80]);
    const [minAgeText, setMinAgeText] = useState("18");
    const [maxAgeText, setMaxAgeText] = useState("80");
    const syncAgeRange = (values: number[]) => {
      setAgeRange(values);
      setMinAgeText(String(values[0]));
      setMaxAgeText(String(values[1]));
    };
    const [hasSearched, setHasSearched] = useState(false);
    const handleSearch = () => {
      const searchPayload = {
        activities: selectedActivities,
        useProfileActivities,
        times: selectedTimes,
        useProfileTimePreferences,
        radiusMiles: radius,
        ageRange: {
          min: ageRange[0],
          max: ageRange[1],
        },
      };

      console.log(searchPayload);
      setHasSearched(true);
    };
    
    const filteredProfiles = mockProfiles
      .filter((profile) => {
        const profileAllowsCurrentUser =
          profile.visibilityPreferences.includes('anyone') ||
          profile.visibilityPreferences.includes(currentUserSex);

        const currentUserAllowsProfile =
          currentUserVisibilityPreferences.includes('anyone') ||
          currentUserVisibilityPreferences.includes(profile.sex);

        const userCanViewProfile =
          profileAllowsCurrentUser &&
          currentUserAllowsProfile;

        const matchesActivity =
          selectedActivities.length === 0 ||
          selectedActivities.some((activity) =>
            profile.activities.includes(activity)
          );

        const matchesTime =
          selectedTimes.length === 0 ||
          profile.preferredTimes.includes('Any') ||
          selectedTimes.some((time) =>
            profile.preferredTimes.includes(time)
          );

        const matchesRadius =
          profile.distanceMiles !== undefined &&
          profile.distanceMiles <= radius;

        const matchesAge =
          profile.age >= ageRange[0] &&
          profile.age <= ageRange[1];

        return (
          userCanViewProfile &&
          matchesActivity &&
          matchesTime &&
          matchesRadius &&
          matchesAge
        );
      })
      .map((profile) => {
        const matchCount = profile.activities.filter((activity) =>
          selectedActivities.includes(activity)
        ).length;

        return {
          ...profile,
          matchCount,
        };
      })
      .sort((a, b) => b.matchCount - a.matchCount);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  
  return (
<ThemedView style={styles.appShell}>
 <ScrollView style={styles.mainContent}>
    <SafeAreaView style={styles.safeArea}>
    <ThemedView style={styles.contentContainer}>
        <ThemedText type="title"
        style={styles.pageTitle}
        >
        Discover Page
        </ThemedText>

        <ThemedText style={styles.pageDescription}>
        Filter preferences and availability to and connect with people nearby!
        </ThemedText>
    <ThemedView>
        <ThemedText style={styles.sectionLabel}>Activity Filters:</ThemedText>

        <TextInput
      style={styles.input}
        placeholder="Search activities to filter for!"
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
                if (!selectedActivities.includes(activity)) {
                    setSelectedActivities([...selectedActivities, activity]);
                }
                setActivitySearch('');
                }}
            >
                <ThemedText style={styles.tagText}>{activity}</ThemedText>
            </Pressable>
            ))}
        </ThemedView>
        )}

        <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectionLabel}>
            Current Activity Filters:
        </ThemedText>

        <Pressable
            style={[
            styles.profileActivityButton,
            useProfileActivities && styles.profileActivityButtonActive,
            ]}
            onPress={() => setUseProfileActivities(!useProfileActivities)}
        >
            <ThemedText style={styles.profileActivityButtonText}>
            Use Profile Activities
            </ThemedText>
        </Pressable>
        </ThemedView>

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
    </ThemedView>

    <ThemedView style={styles.sectionHeader}>
      <ThemedText style={styles.sectionLabel}>Time Filters</ThemedText>

      <Pressable
        style={[
          styles.profileActivityButton,
          useProfileTimePreferences && styles.profileActivityButtonActive,
        ]}
        onPress={() => {
            const newValue = !useProfileTimePreferences;

            setUseProfileTimePreferences(newValue);

            if (newValue) {
                setSelectedTimes([]);
            }
        }}
      >
        <ThemedText style={styles.profileActivityButtonText}>
          Use Profile Times
        </ThemedText>
      </Pressable>
      </ThemedView>

        <ThemedView style={styles.optionRow}>
            <Pressable
                disabled={useProfileTimePreferences}
                style={[
                    styles.optionButton,
                    useProfileTimePreferences && styles.buttonDisabled,
                    selectedTimes.length === 0 &&
                    !useProfileTimePreferences &&
                    styles.optionButtonActive,
                ]}
                onPress={() => {
                setUseProfileTimePreferences(false);
                setSelectedTimes([]);
                }}
            >
                <ThemedText>Any</ThemedText>
            </Pressable>

            {timeOptions.map((time) => (
                <Pressable
                disabled={useProfileTimePreferences}
                key={time}
                style={[
                    styles.optionButton,
                    useProfileTimePreferences && styles.buttonDisabled,
                    selectedTimes.includes(time) && styles.optionButtonActive,
                    ]}
                onPress={() => {
                    setUseProfileTimePreferences(false);
                    if (selectedTimes.includes(time)) {
                    setSelectedTimes(
                        selectedTimes.filter(
                        (selectedTime) => selectedTime !== time
                        )
                    );
                    return;
                    }

                    const nextSelectedTimes = [
                      ...selectedTimes,
                      time,
                    ];

                    if (nextSelectedTimes.length === timeOptions.length) {
                      setSelectedTimes([]);
                      return;
                    }

                  setSelectedTimes(nextSelectedTimes);
                }}
                >
                <ThemedText>{time}</ThemedText>
                </Pressable>
            ))}
    </ThemedView>

    <ThemedText style={styles.sectionLabel}>Location Radius</ThemedText>

    <ThemedView style={styles.radiusHeader}>
      <ThemedText style={styles.helperText}>
        Search Radius
      </ThemedText>

      <ThemedText style={styles.helperText}>
        {radius} miles
      </ThemedText>
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

            if (digitsOnly === '') {
              return;
            }

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

            if (digitsOnly === '') {
              return;
            }

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
        {hasSearched ? 'Results Showing' : 'Search'}
      </ThemedText>
    </Pressable>

    {hasSearched && (
      <ThemedView>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionLabel}>
            Results
          </ThemedText>

          <Pressable
            style={styles.clearResultsButton}
            onPress={() => setHasSearched(false)}
          >
            <ThemedText>
              Clear Results
            </ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.resultsGrid}>
          {filteredProfiles.length === 0 ? (
            <ThemedText style={styles.helperText}>
              No activity matches found.
              {"\n"}
              Try selecting different activities or increasing your search radius!
            </ThemedText>
          ) : (
          filteredProfiles.map((profile) => (
            <SearchProfileCard
              key={profile.id}
              profile={profile}
              onPress={() => setSelectedProfile(profile)}
            />
          ))
          )}
        </ThemedView>
      </ThemedView>
      )}
   </ThemedView>
   </SafeAreaView>
  </ScrollView>
    <SearchProfileModal
    profile={selectedProfile}
    onClose={() => setSelectedProfile(null)}
  />
  <Sidebar />
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
  borderColor: '#000000',
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