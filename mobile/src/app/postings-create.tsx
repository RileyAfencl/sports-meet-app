import { ConfirmPostingModal } from '@/components/confirm-posting-modal';
import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import type { CreatePostingPayload } from '@/types/posting';
import { VisibilityPreference, postingVisibilityLabels, postingVisibilityOptions } from '@/types/sex';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostingsCreate() {
    const [title, setTitle] = useState('');
    const [activitySearch, setActivitySearch] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const shouldShowActivityResults = activitySearch.trim().length > 0;

    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [eventTime, setEventTime] = useState<Date | null>(null);

    const [locationName, setLocationName] = useState('');

    const [visibility, setVisibility] = useState<VisibilityPreference[]>([]);
    
    const [maxParticipantsText, setMaxParticipantsText] = useState('');

    const [noParticipantLimit, setNoParticipantLimit] = useState(false);

    const hasParticipantLimit = Boolean(maxParticipantsText.trim());

    const [pendingPosting, setPendingPosting] = useState<CreatePostingPayload | null>(null);

    const [showConfirmPostingModal, setShowConfirmPostingModal] = useState(false);

    const [description, setDescription] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [ageRange, setAgeRange] = useState([18, 80]);
    const [minAgeText, setMinAgeText] = useState("18");
    const [maxAgeText, setMaxAgeText] = useState("80");
    const syncAgeRange = (values: number[]) => {
      setAgeRange(values);
      setMinAgeText(String(values[0]));
      setMaxAgeText(String(values[1]));
    };
    
    const combineDateAndTime = (date: Date, time: Date): Date => {
        const combinedDateTime = new Date(date);

        combinedDateTime.setHours(
            time.getHours(),
            time.getMinutes(),
            0,
            0
        );

        return combinedDateTime;
    }

    const handleCreatePosting = () => {
        if (
            !title.trim() ||
            !selectedActivity ||
            !eventDate ||
            !eventTime ||
            !locationName.trim() ||
            visibility.length === 0
        ) {
            console.log('Missing required posting fields');
            return;
        }

        const trimmedParticipantLimit =
        maxParticipantsText.trim();

        const maxParticipants =
        noParticipantLimit || !trimmedParticipantLimit
            ? null
            : Number(trimmedParticipantLimit);

        if (
            maxParticipants !== null &&
            (
                !Number.isInteger(maxParticipants) ||
                maxParticipants < 1
            )
        ) {
            console.log(
                'Participant limit must be a whole number of at least 1.'
            );
            return;
        }

        const postingDateTime = combineDateAndTime(eventDate!, eventTime!);

        const minimumPostingTime = new Date();
        minimumPostingTime.setMinutes(
        minimumPostingTime.getMinutes() + 30
        );

        if (postingDateTime < minimumPostingTime) {
        console.log(
            'Posting must be scheduled at least 30 minutes in advance.'
        );
        return;
        }

        const payload: CreatePostingPayload = {
            title: title.trim(),
            activity: selectedActivity,
            dateTime: combineDateAndTime(eventDate, eventTime),
            locationName: locationName.trim(),
            visibility,
            ageRange: {
            min: ageRange[0],
            max: ageRange[1],
            },
            maxParticipants,
            description: description.trim() || null,
        };

        setPendingPosting(payload);
        setShowConfirmPostingModal(true);
    };

    const filteredActivities = activityOptions.filter(
        (activity) =>
          activity.toLowerCase().includes(activitySearch.toLowerCase()) &&
          selectedActivity !== activity
      );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    const minimumTime = new Date();
        minimumTime.setMinutes(minimumTime.getMinutes() + 30);

    const toggleVisibilityOption = (
        option: VisibilityPreference
        ) => {
        if (option === 'anyone') {
            setVisibility(['anyone']);
            return;
        }

        const withoutAnyone = visibility.filter(
            (item) => item !== 'anyone'
        );

        const nextVisibility = withoutAnyone.includes(option)
            ? withoutAnyone.filter((item) => item !== option)
            : [...withoutAnyone, option];

        if (nextVisibility.length === 0) {
            setVisibility(['anyone']);
            return;
        }

        const nonDefaultOptions =
            postingVisibilityOptions.filter(
            (item) => item !== 'anyone'
            );

        const allSpecificOptionsSelected =
            nonDefaultOptions.every((item) =>
            nextVisibility.includes(item)
            );

        if (allSpecificOptionsSelected) {
            setVisibility(['anyone']);
            return;
        }

        setVisibility(nextVisibility);
        };

return (
 <ThemedView style={styles.container}>
       <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <ThemedText type="title" style={styles.pageTitle}>
                        Create Posting
            </ThemedText>

            <ThemedText style={styles.sectionLabel}>Create a Posting Title</ThemedText>

            <TextInput
                    style={styles.input}
                    placeholder="Posting Title"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
            />

            <ThemedText style={styles.sectionLabel}>
                {selectedActivity ? 'Selected Activity' : 'Select an Activity'}
            </ThemedText>

            {selectedActivity ? (
            <ThemedView>
                <Pressable
                    style={styles.tagBubble}
                    onPress={() => setSelectedActivity('')}
                >
                    <ThemedText style={styles.tagText}>
                        {selectedActivity}
                    </ThemedText>
                </Pressable>

                <ThemedText style={styles.helperText}>
                    Tap the activity to clear your selection.
                </ThemedText>

                </ThemedView>
                ) : (
                <>
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
                            setSelectedActivity(activity);
                            setActivitySearch('');
                            }}
                        >
                            <ThemedText style={styles.tagText}>
                            {activity}
                            </ThemedText>
                        </Pressable>
                    ))}
                    </ThemedView>
                )}
            </>
            )}

            <ThemedText style={styles.sectionLabel}>
            Date and Time
            </ThemedText>

            <ThemedView style={styles.dateTimeRow}>
                <Pressable
                    style={styles.dateTimeButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <ThemedText style={styles.dateTimeLabel}>
                    Date
                    </ThemedText>

                    <ThemedText style={styles.dateTimeValue}>
                    {eventDate
                        ? eventDate.toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })
                        : 'Select Date'}
                    </ThemedText>
                </Pressable>

                <Pressable
                    style={styles.dateTimeButton}
                    onPress={() => setShowTimePicker(true)}
                >
                    <ThemedText style={styles.dateTimeLabel}>
                    Time
                    </ThemedText>

                    <ThemedText style={styles.dateTimeValue}>
                    {eventTime
                        ? eventTime.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                        })
                        : 'Select Time'}
                    </ThemedText>
                </Pressable>
            </ThemedView>

            <ThemedText style={styles.helperText}>
            If posting for today, time must be 30 minutes in advance or greater. 
            Postings may be scheduled up to 14 days in advance.
            </ThemedText>

            {showDatePicker && (
            <DateTimePicker
                value={eventDate ?? today}
                mode="date"
                minimumDate={today}
                maximumDate={maxDate}
                onValueChange={(_, selectedDate) => {
                    setShowDatePicker(false);

                    if (selectedDate) {
                        setEventDate(selectedDate);
                    }
                    }}
            />
            )}

            {showTimePicker && (
            <DateTimePicker
                value={eventTime ?? minimumTime}
                mode="time"
                onValueChange={(_, selectedTime) => {
                    setShowTimePicker(false);

                    if (!selectedTime || !eventDate) {
                        return;
                    }

                    const selectedDateTime = combineDateAndTime(
                        eventDate,
                        selectedTime
                    );

                    const earliestAllowedTime = new Date();
                    earliestAllowedTime.setMinutes(
                        earliestAllowedTime.getMinutes() + 30
                    );

                    const correctedTime =
                        selectedDateTime < earliestAllowedTime
                        ? earliestAllowedTime
                        : selectedTime;

                    setEventTime(correctedTime);
                    }}
                onDismiss={() => setShowTimePicker(false)}
            />
            )}

            <ThemedText style={styles.sectionLabel}>
                Meeting Location
            </ThemedText>

            <TextInput
                style={styles.input}
                value={locationName}
                onChangeText={setLocationName}
                placeholder="Example: Riverfront Park Basketball Courts"
            />

            <ThemedText style={styles.helperText}>
                Enter a meeting location. Maps integration will be added in a future update.
            </ThemedText>

            <ThemedText style={styles.sectionLabel}> Posting Visibility </ThemedText>

            <ThemedView style={styles.optionRow}>
            {postingVisibilityOptions.map((option) => (
                <Pressable
                key={option}
                style={[
                    styles.optionButton,
                    visibility.includes(option) &&
                    styles.optionButtonActive,
                ]}
                onPress={() => toggleVisibilityOption(option)}
                >
                <ThemedText style={styles.optionButtonText}>
                    {postingVisibilityLabels[option]}
                </ThemedText>
                </Pressable>
            ))}
            </ThemedView>

            <ThemedText style={styles.helperText}>
            Visibility determines who may see and join this posting.
            </ThemedText>

            <ThemedText style={styles.sectionLabel}>Participant Age Range</ThemedText>
            
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
                  sliderLength={280}
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

                <ThemedText style={styles.sectionLabel}> Set Participant Limit </ThemedText>

                <ThemedView style={styles.participantLimitRow}>
                <TextInput
                    style={[
                    styles.participantLimitInput,
                    noParticipantLimit &&
                        styles.participantLimitInputDisabled,
                    ]}
                    value={maxParticipantsText}
                    onChangeText={(value) => {
                    setMaxParticipantsText(value);

                    if (value.trim()) {
                        setNoParticipantLimit(false);
                    }
                    }}
                    onFocus={() => {
                    setNoParticipantLimit(false);
                    }}
                    onBlur={() => {
                        if (!hasParticipantLimit) {
                        setNoParticipantLimit(true);
                        }
                    }}
                    placeholder="Set Maximum"
                    keyboardType="number-pad"
                    maxLength={3}
                />

                <Pressable
                    style={[
                    styles.noLimitButton,
                    noParticipantLimit &&
                        styles.optionButtonActive,
                    hasParticipantLimit &&
                        styles.noLimitButtonDisabled,
                    ]}
                    disabled={hasParticipantLimit}
                    onPress={() => {
                    setNoParticipantLimit(!noParticipantLimit);
                    setMaxParticipantsText('');
                    }}
                >
                    <ThemedText style={styles.optionButtonText}>
                    No Limit
                    </ThemedText>
                </Pressable>
                </ThemedView>

                <ThemedText style={styles.sectionLabel}>Posting Description</ThemedText>
                
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Tell people about your posting!"
                    placeholderTextColor="#888"
                    multiline
                    scrollEnabled
                    maxLength={300}
                    value={description}
                    onChangeText={setDescription}
                />
                
                <ThemedText style={styles.descriptionHelperText}>
                {description.length} / 300 characters
                </ThemedText>

                <Pressable
                style={styles.createPostingButton}
                onPress={handleCreatePosting}
                >
                <ThemedText style={styles.createPostingButtonText}>
                    Create Posting
                </ThemedText>
                </Pressable>

        </ScrollView>
    </SafeAreaView>

  <ConfirmPostingModal
    visible={showConfirmPostingModal}
    posting={pendingPosting}
    onClose={() => {
        setShowConfirmPostingModal(false);
        setPendingPosting(null);
    }}
    onConfirm={() => {
        if (!pendingPosting) {
        return;
        }

        console.log('Confirmed posting:', pendingPosting);

        setShowConfirmPostingModal(false);
        setPendingPosting(null);
    }}
    />
  <Sidebar />
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
pageTitle: {
  textAlign: 'center',
  marginBottom: 2,
  fontSize: 35,
  fontWeight: '700',
},
sectionLabel: {
  alignSelf: 'stretch',
  marginTop: 16,
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
  alignSelf: 'stretch',
},
tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: Spacing.two,
  marginTop: 8,
},
tagBubble: {
  alignSelf: 'flex-start',
  borderWidth: 1,
  borderColor: '#000000',
  borderRadius: 999,
  paddingHorizontal: 14,
  paddingVertical: 8,
},
tagText: {
  fontSize: 14,
  alignSelf: 'center',
},
helperText: {
  marginTop: 6,
  fontSize: 12,
  opacity: 0.65,
},
dateTimeRow: {
  flexDirection: 'row',
  gap: 8,
  marginTop: 8,
},
dateTimeButton: {
  flex: 1,
  minHeight: 30,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 8,
},
dateTimeLabel: {
  fontSize: 12,
  opacity: 0.65,
},
dateTimeValue: {
  fontSize: 15,
  fontWeight: '600',
  color: '#000',
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
optionButtonActive: {
   borderColor: '#8b5cf6',
  borderWidth: 2,
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
participantLimitRow: {
  flexDirection: 'row',
  gap: 8,
  marginTop: 8,
},
participantLimitInput: {
  borderWidth: 1,
  flex:.5, 
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 15,
  textAlign: 'center', 
},
participantLimitInputDisabled: {
  opacity: 0.4,
  backgroundColor: '#eeeeee',
},
noLimitButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 8,
},
noLimitButtonDisabled: {
  opacity: 0.4,
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
descriptionHelperText: {
  fontSize: 12,
  opacity: 0.7,
  alignSelf: 'flex-end'
},
createPostingButton: {
  marginTop: 20,
  borderRadius: 8,
  backgroundColor: '#000000',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
},
createPostingButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '700',
},
})















