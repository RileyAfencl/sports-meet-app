import { DateRangePicker } from '@/components/daterangepicker';
import { JoinPostingModal } from '@/components/join-posting-modal';
import { SearchPostingCard } from '@/components/search-posting-card';
import { SearchPostingModal } from '@/components/search-posting-modal';
import { SearchProfileModal } from '@/components/search-profile-modal';
import { Sidebar } from '@/components/sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ViewParticipantsModal } from '@/components/view-participants-modal';
import { activityOptions } from '@/constants/activity-options';
import { Spacing } from '@/constants/theme';
import { mockPostings } from '@/mock-data/mock-postings';
import { mockProfiles } from '@/mock-data/mock-profiles';
import { Posting } from '@/types/posting';
import { Profile } from '@/types/profile';
import { Sex } from '@/types/sex';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const currentUserAge = 27;
 
const currentUserSex: Sex = 'male';

const mockParticipants: Profile [] = mockProfiles;

export default function PostingsScreen() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [joinedPostingIds, setJoinedPostingIds] = useState<string[]>([]);
  
  const [activitySearch, setActivitySearch] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [expandedActivities, setExpandedActivities] = useState<string[]>([]);
  const filteredActivities = activityOptions.filter(
    (activity) =>
      activity.toLowerCase().includes(activitySearch.toLowerCase()) &&
      !selectedActivities.includes(activity)
  );

  const shouldShowActivityResults = activitySearch.trim().length > 0;
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);

  const [joinPostingChat, setJoinPostingChat] = useState(false);

  const [radius, setRadius] = useState(5);

  const [hasSearched, setHasSearched] = useState(false);

  const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [returnToParticipants, setReturnToParticipants] = useState(false);
  

  const isSelectedPostingJoined =
  selectedPosting !== null &&
  joinedPostingIds.includes(selectedPosting.id);

  const filteredPostings = mockPostings
  .filter((posting) => {
    const isNotFull =
      posting.maxParticipants === null ||
      posting.participants.length < posting.maxParticipants;

  const matchesActivity =
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

    setExpandedActivities([]);
    console.log(searchPayload);
    setHasSearched(true);
  };

  const postingsByActivity = filteredPostings.reduce<
      Record<string, Posting[]>
    >((groups, posting) => {
      if (!groups[posting.activity]) {
        groups[posting.activity] = [];
      }

      groups[posting.activity].push(posting);

      return groups;
    }, {});

  const toggleActivitySection = (activity: string) => {
    setExpandedActivities((currentActivities) =>
      currentActivities.includes(activity)
        ? currentActivities.filter(
            (currentActivity) => currentActivity !== activity
          )
        : [...currentActivities, activity]
    );
  };

  return (
    <ThemedView style={styles.appShell}>

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
                <ThemedText style={styles.sectionLabel}>
                  Results ({filteredPostings.length})
                </ThemedText>

                <Pressable
                  style={styles.clearResultsButton}
                  onPress={() => {
                    setHasSearched(false);
                    setExpandedActivities([]);
                  }}
                >
                  <ThemedText>Clear Results</ThemedText>
                </Pressable>
              </ThemedView>

              {filteredPostings.length === 0 ? (
                <ThemedText style={styles.helperText}>
                  No postings matched your filters.
                </ThemedText>
              ) : (
                <ThemedView style={styles.resultsGrid}>
                  {Object.entries(postingsByActivity).map(
                    ([activity, postings]) => {
                      const isExpanded =
                        expandedActivities.includes(activity);

                      return (
                        <ThemedView
                          key={activity}
                          style={styles.activitySection}
                        >
                          <Pressable
                            style={styles.activityHeader}
                            onPress={() =>
                              toggleActivitySection(activity)
                            }
                          >
                            <ThemedText style={styles.activityHeaderText}>
                              {activity} ({postings.length})
                            </ThemedText>

                            <Ionicons
                              name={
                                isExpanded
                                  ? 'chevron-down'
                                  : 'chevron-forward'
                              }
                              size={20}
                              color="#000"
                            />
                          </Pressable>

                          {isExpanded && (
                            <ThemedView style={styles.postingList}>
                              {postings.map((posting) => (
                                <SearchPostingCard
                                  key={posting.id}
                                  posting={posting}
                                  onPress={() =>
                                    setSelectedPosting(posting)
                                  }
                                />
                              ))}
                            </ThemedView>
                          )}
                        </ThemedView>
                      );
                    }
                  )}
                </ThemedView>
              )}
            </ThemedView>
          )}
        </ThemedView>
       </SafeAreaView>
      </ScrollView>

      <SearchPostingModal
        posting={selectedPosting}
        isJoined={isSelectedPostingJoined}
        onClose={() => setSelectedPosting(null)}
        onCreatorPress={() => {
          if (!selectedPosting?.creator) return;

          setReturnToParticipants(false);
          setSelectedProfile(selectedPosting.creator);
        }}
        onViewParticipants={() => {
          setShowParticipants(true);
        }}
        onJoinPress={() => {
            setJoinPostingChat(false);
            setShowJoinConfirmation(true);
          }}
      />

      <ViewParticipantsModal
        participants={
          selectedPosting?.participants ?? mockParticipants
        }
        visible={showParticipants}
        onClose={() => setShowParticipants(false)}
        onParticipantPress={(participant) => {
          setShowParticipants(false);
          setReturnToParticipants(true);
          setSelectedProfile(participant);
        }}
      />

      <SearchProfileModal
        profile={selectedProfile}
        onClose={() => {
          setSelectedProfile(null);

          if (returnToParticipants) {
            setShowParticipants(true);
            setReturnToParticipants(false);
          }
        }}
      />

      <JoinPostingModal
        posting={selectedPosting}
        visible={showJoinConfirmation}
        joinPostingChat={joinPostingChat}
        onJoinPostingChatChange={setJoinPostingChat}
        onCancel={() => {
          setShowJoinConfirmation(false);
          setJoinPostingChat(false);
        }}
        onConfirm={() => {
          if (!selectedPosting) return;

          const joinPayload = {
            postingId: selectedPosting.id,
            joinPostingChat,
          };

          console.log('Join posting payload:', joinPayload);

          setJoinedPostingIds((currentIds) =>
            currentIds.includes(selectedPosting.id)
              ? currentIds
              : [...currentIds, selectedPosting.id]
          );

          setShowJoinConfirmation(false);
          setJoinPostingChat(false);
        }}
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
activitySection: {
  marginBottom: 8,
},
activityHeader: {
  width: '100%',
  minHeight: 44,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 6,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
activityHeaderText: {
  fontSize: 15,
  fontWeight: '700',
  color: '#000',
},
postingList: {
  marginTop: 4,
  marginLeft: 12,
  paddingLeft: 5,
  borderLeftWidth: 2,
  borderLeftColor: '#d0d0d0',
  gap: 4,
},
});