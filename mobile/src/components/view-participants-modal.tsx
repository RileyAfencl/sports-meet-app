import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Profile } from '@/types/profile';
import { sexInitials } from '@/types/sex';
import { Modal, Pressable, ScrollView, StyleSheet, } from 'react-native';

type ViewParticipantsModalProps = {
  participants: Profile[];
  visible: boolean;
  onClose: () => void;
  onParticipantPress: (participant: Profile) => void;
};

export function ViewParticipantsModal({
  participants,
  visible,
  onClose,
  onParticipantPress,
}: ViewParticipantsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.header}>
            <ThemedView>
              <ThemedText style={styles.title}>
                Participants ({participants.length})
              </ThemedText>
            </ThemedView>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <ThemedText style={styles.closeButtonText}>
                ×
              </ThemedText>
            </Pressable>
          </ThemedView>

          {participants.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText style={styles.emptyStateText}>
                No participants have joined yet.
              </ThemedText>
            </ThemedView>
          ) : (
            <ScrollView
              style={styles.participantList}
              contentContainerStyle={styles.participantListContent}
              showsVerticalScrollIndicator={false}
            >
              {participants.map((participant) => {
                const visibleActivities = participant.activities.slice(0, 3);
                const remainingActivityCount =
                    participant.activities.length - visibleActivities.length;

                const activityText =
                    visibleActivities.join(', ') +
                    (remainingActivityCount > 0
                    ? ` +${remainingActivityCount} more`
                    : '');

                return (
                    <Pressable
                    key={participant.id}
                    style={styles.participantRow}
                    onPress={() => onParticipantPress(participant)}
                    >
                    <ThemedView style={styles.photoPlaceholder}>
                        <ThemedText style={styles.photoText}>
                        Photo
                        </ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.participantInfo}>
                        <ThemedText style={styles.participantName}>
                        {participant.firstName}{' '}
                        {participant.lastInitial}. -{' '}
                        {sexInitials[participant.sex]},{' '}
                        {participant.age}
                        </ThemedText>

                        <ThemedText
                        style={styles.activityText}
                        numberOfLines={1}
                        >
                        {activityText}
                        </ThemedText>
                    </ThemedView>
                    </Pressable>
                );
                })}
            </ScrollView>
          )}
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
    maxHeight: '75%',
    borderRadius: 14,
    padding: Spacing.three,
    backgroundColor: '#fff',
},
header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
},
title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
},
countText: {
    fontSize: 13,
    color: '#000',
    opacity: 0.65,
    marginTop: 2,
},
closeButton: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
},
closeButtonText: {
    fontSize: 24,
    lineHeight: 26,
    color: '#000',
},
participantList: {
    width: '100%',
},
participantListContent: {
    gap: 8,
    paddingBottom: 4,
},
participantRow: {
    width: '100%',
    minHeight: 64,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
},
photoPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
},
photoText: {
    fontSize: 11,
    color: '#000',
    opacity: 0.7,
},
participantInfo: {
    flex: 1,
},
participantName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
},
activityText: {
    fontSize: 12,
    color: '#000',
    opacity: 0.65,
    marginTop: 3,
},
emptyState: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
},
emptyStateText: {
    fontSize: 14,
    color: '#000',
    opacity: 0.65,
},
});