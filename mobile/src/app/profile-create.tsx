import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import { sexLabels, sexOptions, type Sex } from '@/types/sex';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const visibilityOptions = ['Anyone', 'Men', 'Women', 'Other'];
const timeOptions = ['Any', 'Morning', 'Afternoon', 'Evening'];

export default function ProfileCreateScreen() {
  const [activitySearch, setActivitySearch] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const filteredActivities = activityOptions.filter((activity) =>
  activity.toLowerCase().includes(activitySearch.toLowerCase())
  );
  const shouldShowActivityResults = activitySearch.trim().length > 0;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState<Sex | null>(null);
  const [aboutMe, setAboutMe] = useState('');
  const [preferredTimes, setPreferredTimes] = useState<string[]>(['Any']);
  const [visibilityPreferences, setVisibilityPreferences] = useState<string[]>([]);

  const handleContinue = () => {
    const profilePayload = {
      firstName,
      lastName,
      dateOfBirth,
      sex,
      activities: selectedActivities,
      visibilityPreferences,
      aboutMe,
    };

    console.log(profilePayload);

    router.push('/discovery');
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
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
         <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      >
        <ThemedText type="title">Create Profile</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="#888"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <ThemedText style={styles.helperText}>
          Users must be 18 or older.
        </ThemedText>

        <ThemedText style={styles.sectionLabel}>Sex</ThemedText>

        <ThemedView style={styles.optionRow}>
          {sexOptions.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.optionButton,
                sex === option && styles.optionButtonActive,
              ]}
              onPress={() => setSex(option)}
            >
              <ThemedText style={styles.optionButtonText}>
                {sexLabels[option]}
              </ThemedText>
            </Pressable>
          ))}
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
          Visibility determines who may see your profile on the discovery page, as well as who has permission to direct message you. 
        </ThemedText>

        <ThemedText style={styles.sectionLabel}>Availability Preference</ThemedText>

        <ThemedView style={styles.optionRow}>
          {timeOptions.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.optionButton,
                preferredTimes.includes(option) &&
                  styles.optionButtonActive,
              ]}
              onPress={() =>
                option === 'Any'
                  ? setPreferredTimes(['Any'])
                  : toggleArrayOption(
                      option,
                      preferredTimes,
                      setPreferredTimes,
                      ['Morning', 'Afternoon', 'Evening'],
                      'Any'
                    )
              }
            >
              <ThemedText style = {styles.optionButtonText}>{option}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedText style={styles.sectionLabel}>About Me</ThemedText>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Tell people a little about yourself..."
          placeholderTextColor="#888"
          multiline
          scrollEnabled
          maxLength={300}
          value={aboutMe}
          onChangeText={setAboutMe}
        />

        <ThemedText style={styles.helperText}>
          {aboutMe.length} / 300 characters
        </ThemedText>

        <Pressable style={styles.continueButton}
                   onPress={handleContinue}>
          <ThemedText style={styles.continueButtonText}>
            Continue
          </ThemedText>
        </Pressable>
        </ScrollView>
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
  paddingHorizontal: Spacing.four,
  width: '100%',
  maxWidth: 600,
  alignSelf: 'center',
},
scrollView: {
  flex: 1,
},
scrollContent: {
  paddingHorizontal: Spacing.four,
  paddingBottom: 40,
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
  color: '#000000',
  alignSelf: 'stretch',
},
continueButton: {
  borderWidth: 1,
  borderColor: '#000000',
  borderRadius: 8,
  paddingHorizontal: 28,
  paddingVertical: 10,
  marginTop: 16,
  alignSelf: 'center',
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
  borderColor: '#000000',
  borderRadius: 8,
  paddingVertical: 12,
  alignItems: 'center',
},
optionButtonText: {
  fontWeight: '800',
  fontSize:14
},
helperText: {
  fontSize: 12,
  opacity: 0.7,
  alignSelf: 'flex-end'
},
tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: Spacing.two,
  alignSelf: 'stretch',
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
descriptionInput: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#000000',
  alignSelf: 'stretch',
  height: 120,
  textAlignVertical: 'top',
},
optionButtonActive: {
   borderColor: '#8b5cf6',
  borderWidth: 2,
},
});