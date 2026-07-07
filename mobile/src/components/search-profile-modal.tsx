import { Modal, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type SearchProfileModalProps = {
  profile: {
    id: string;
    firstName: string;
    lastInitial: string;
    age: number;
    activities: string[];
    preferredTimes?: string[];
    distanceMiles?: number;
    aboutMe?: string;
    matchCount: number;
  } | null;
  onClose: () => void;
};



export function SearchProfileModal({
  profile,
  onClose,
}: SearchProfileModalProps) {
  if (!profile) {
    return null;
  }

  const preferredTimesText =
  profile.preferredTimes?.length === 3
    ? 'Any'
    : profile.preferredTimes?.join(', ') || 'No preferred times listed.';

  return (
    <Modal transparent animationType="fade" visible={!!profile}>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalCard}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>X</ThemedText>
          </Pressable>

          <ThemedView style={styles.profileHeader}>
           <ThemedView style={styles.profileLeftColumn}>
            <ThemedView style={styles.photoPlaceholder}>
              <ThemedText style={styles.photoText}>Photo</ThemedText>
            </ThemedView>
            <ThemedText style={styles.nameText}>
              {profile.firstName} {profile.lastInitial}. - {profile.age}
            </ThemedText>

            <ThemedText style={styles.subText}>
              {profile.distanceMiles} miles away
            </ThemedText> 
           </ThemedView>

            <ThemedView style={styles.profileRightColumn}>
              <ThemedText style={styles.sectionLabel}>Preferred Times</ThemedText>
              <ThemedText style={styles.bodyText}>
                {preferredTimesText}
              </ThemedText>

              <ThemedText style={styles.sectionLabelSpaced}>Activities</ThemedText>
              <ThemedText style={styles.bodyText}>
                {profile.activities.join(', ')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedText style={styles.sectionLabel}>About Me</ThemedText>
          <ThemedText style={styles.bodyText}>
            {profile.aboutMe || 'No bio added yet.'}
          </ThemedText>

          <Pressable style={styles.messageButton}>
            <ThemedText style={styles.messageButtonText}>Message</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.three,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: Spacing.one,
  },
  closeButtonText: {
    fontWeight: '700',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    opacity: 0.7,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: Spacing.one,
  },
  helperText: {
    opacity: 0.7,
    textAlign: 'center',
  },
  subText: {
    opacity: 0.7,
    textAlign: 'left',
    marginTop:Spacing.one,
  },
  sectionLabel: {
    fontWeight: '700',
    marginTop: Spacing.one,
  },
  sectionLabelSpaced: {
    fontWeight: '700',
    marginTop: Spacing.two,
  },
  bodyText: {
    opacity: 0.85,
  },
  messageButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  messageButtonText: {
    fontWeight: '700',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.six,
    justifyContent: 'space-between',
    width: '100%',
  },
  profileLeftColumn: {
    alignItems: 'center',
    flexShrink: 0,
    width: 140,
  },
  profileRightColumn: {
    flex: 1,
  },
});