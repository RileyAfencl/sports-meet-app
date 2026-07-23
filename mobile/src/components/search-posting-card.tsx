import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Posting } from '@/types/posting';
import { postingVisibilityLabels } from '@/types/sex';
import { Pressable, StyleSheet } from 'react-native';

type SearchPostingCardProps = {
  posting: Posting;
  onPress: () => void;
}

export function SearchPostingCard({
  posting,
  onPress,
}: SearchPostingCardProps) {
  const formattedDateTime = posting.dateTime.toLocaleString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const participantText =
  posting.maxParticipants === null
    ? `${posting.participants.length}/∞`
    : `${posting.participants.length}/${posting.maxParticipants}`;

  return (
  <Pressable style={styles.card} onPress={onPress}>
    <ThemedText style={styles.title} numberOfLines={1}>
      {posting.title}
    </ThemedText>

    <ThemedView style={styles.metaRow}>
      <ThemedText style={styles.metaText} numberOfLines={1}>
        {formattedDateTime}
      </ThemedText>

      <ThemedText style={styles.metaText}>
        {posting.distanceMiles.toFixed(1)} mi
      </ThemedText>

      <ThemedText style={styles.metaText}>
            {' '}
            {posting.visibility
                .map((value) => postingVisibilityLabels[value])
                .join(', ')}
            </ThemedText>


      <ThemedText style={styles.metaText}>
        {participantText}
      </ThemedText>
    </ThemedView>
  </Pressable>
);
}

const styles = StyleSheet.create({
card: {
  width: '100%',
  borderWidth: 2,
  borderColor: '#555',
  borderRadius: 1,
  paddingHorizontal: 6,
  paddingVertical: 3,
},
title: {
  fontSize: 16,
  fontWeight: '700',
  color: '#000',
},
metaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
metaText: {
  fontSize: 14,
  color: '#000',
  opacity: .9
},
participantText: {
  fontSize: 13,
  fontWeight: '700',
  color: '#000',
},
});