import { Modal, Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Posting } from '@/types/posting';
import { postingVisibilityLabels, sexInitials } from '@/types/sex';

type SearchPostingModalProps = {
  posting: Posting | null;
  isJoined: boolean;
  onClose: () => void;
  onCreatorPress: () => void;
  onViewParticipants: () => void;
  onJoinPress: () => void;
};

export function SearchPostingModal({
  posting,
  isJoined,
  onClose,
  onCreatorPress,
  onViewParticipants,
  onJoinPress,
}: SearchPostingModalProps) {
  if (!posting) {
    return null;
  }

  const formattedDate = posting.dateTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = posting.dateTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const visibilityText = posting.visibility
    .map((value) => postingVisibilityLabels[value])
    .join(', ');

  const participantText =
    posting.maxParticipants === null
      ? `${posting.participants.length} joined, no participant limit`
      : `${posting.participants.length} of ${posting.maxParticipants} spots filled`;

  const participants = posting.participants ?? [];

  return (
    <Modal
      visible={posting !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>×</ThemedText>
          </Pressable>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText style={styles.title}>
              {posting.title}
            </ThemedText>

            <ThemedText style={styles.activity}>
              {posting.activity}
            </ThemedText>

                <ThemedView style={styles.creatorRow}>
                  <ThemedText style={styles.creatorLabel}>
                  Hosted by
                  </ThemedText>

                  <Pressable
                  style={styles.creatorButton}
                  onPress={onCreatorPress}
                  >
                  <ThemedText style={styles.creatorName}>
                        {posting.creator.firstName}{' '}
                        {posting.creator.lastInitial}. -{' '}
                        {sexInitials[posting.creator.sex]},{' '}
                        {posting.creator.age}
                  </ThemedText>
                  </Pressable>
              </ThemedView>

            <ThemedView style={styles.detailsSection}>
              <ThemedText style={styles.detailText}>
                Date: {formattedDate}
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Time: {formattedTime}
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Distance: {posting.distanceMiles.toFixed(1)} miles
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Location: {posting.locationName}
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Visibility: {visibilityText}
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Age range: {posting.ageRange.min}–{posting.ageRange.max}
              </ThemedText>

              <ThemedText style={styles.detailText}>
                Participants: {participantText}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText style={styles.sectionLabel}>
                Description
              </ThemedText>

              <ThemedText style={styles.bodyText}>
                {posting.description || 'No description added yet.'}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
              <Pressable
                style={styles.secondaryButton}
                onPress={onViewParticipants}
              >
                <ThemedText style={styles.participantsButtonText}>
                    View Participants ({participants.length})
                </ThemedText>
              </Pressable>
            </ThemedView>

            <Pressable
              style={[
                styles.joinButton,
                isJoined && styles.joinButtonDisabled,
              ]}
              disabled={isJoined}
              onPress={onJoinPress}
            >
              <ThemedText style={styles.joinButtonText}>
                {isJoined ? 'Joined' : 'Join Posting'}
              </ThemedText>
            </Pressable>
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 18,
},
modalContainer: {
    width: '100%',
    maxHeight: '88%',
    borderRadius: 14,
    padding: Spacing.three,
    backgroundColor: '#fff',
},
scrollView: {
    width: '100%',
},
scrollContent: {
    paddingBottom: 8,
},
closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
},
closeButtonText: {
    fontSize: 24,
    lineHeight: 26,
    color: '#000',
},
title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    paddingRight: 44,
},
activity: {
  fontSize: 15,
  fontWeight: '600',
  color: '#000',
  opacity: 0.7,
  marginTop: 2,
},
detailsSection: {
    gap: 6,
},
detailText: {
    fontSize: 14,
    color: '#000',
},
hostedSection: {
    marginTop:2,
    marginBottom:4,
},
section: {
    marginTop: 20,
},
sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
},
bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
},
creatorRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 8,
},
creatorLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
},
creatorButton: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 7,
},
creatorName: {
  fontSize: 14,
  fontWeight: '700',
  color: '#000',
},
participantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
participantCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    opacity: 0.7,
    marginBottom: 8,
},
participantsButton: {
  marginTop: 16,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingVertical: 10,
  alignItems: 'center',
},
participantsButtonText: {
  fontSize: 14,
  fontWeight: '700',
  color: '#000',
},
secondaryButton: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
},
secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
},
joinButton: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    backgroundColor: '#d418d4',
},
joinButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
},
joinButtonDisabled: {
  opacity: 0.5,
},
});