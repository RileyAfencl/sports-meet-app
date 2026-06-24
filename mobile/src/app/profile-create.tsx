import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const activityOptions = [
  'Lifting',
  'Hiking',
  'Basketball',
  'Bowling',
  'Soccer',
  'Pickleball',
  'Fishing',
  'Running',
  'Biking',
  'Golf',
  'Tennis',
  'Disc Golf',
];

export default function ProfileCreateScreen() {
  const [activitySearch, setActivitySearch] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const filteredActivities = activityOptions.filter((activity) =>
  activity.toLowerCase().includes(activitySearch.toLowerCase())
  );
  const shouldShowActivityResults = activitySearch.trim().length > 0;
  const [aboutMe, setAboutMe] = useState('');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Create Profile</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="#888"
        />

        <ThemedText style={styles.helperText}>
          Users must be 18 or older.
        </ThemedText>

        <ThemedText style={styles.sectionLabel}>Sex</ThemedText>

        <ThemedView style={styles.optionRow}>
          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Male</ThemedText>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Female</ThemedText>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Other</ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedText style={styles.sectionLabel}>Activities</ThemedText>

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
                  if (!selectedActivities.includes(activity)) {
                    setSelectedActivities([...selectedActivities, activity]);
                  }
                  setActivitySearch('');
                }}>
                <ThemedText style={styles.tagText}>{activity}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        )}

        <ThemedText style={styles.sectionLabel}>
          Selected Activities
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

        <ThemedText style={styles.sectionLabel}>Visibility Preference</ThemedText>

        <ThemedView style={styles.optionRow}>
          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Men</ThemedText>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Women</ThemedText>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Other</ThemedText>
          </Pressable>

          <Pressable style={styles.optionButton}>
            <ThemedText style={styles.optionButtonText}>Anyone</ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedText style={styles.helperText}>
          Visibility determines who may see your profile on the discovery page, as well as who has permission to direct message you. 
        </ThemedText>

        <ThemedText style={styles.sectionLabel}>About Me</ThemedText>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Tell people a little about yourself..."
          placeholderTextColor="#888"
          multiline
          maxLength={300}
          value={aboutMe}
          onChangeText={setAboutMe}
        />

        <ThemedText style={styles.helperText}>
          {aboutMe.length} / 300 characters
        </ThemedText>

        <Pressable style={styles.continueButton}>
          <ThemedText style={styles.continueButtonText}>
            Continue
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'stretch',
  },
  continueButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginTop: 16,
  },
  continueButtonText: {
    fontWeight: '700',
  },
  sectionLabel: {
  alignSelf: 'stretch',
  marginTop: 16,
  fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  optionButtonText: {
    fontWeight: '700',
  },
  helperText: {
  alignSelf: 'stretch',
  fontSize: 12,
  opacity: 0.7,
  },
  tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: Spacing.two,
  alignSelf: 'stretch',
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
  descriptionInput: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#fff',
  alignSelf: 'stretch',
  minHeight: 120,
  textAlignVertical: 'top',
  },
});