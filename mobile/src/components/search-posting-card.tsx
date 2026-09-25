import { JoinedBadge } from '@/components/joined-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Posting } from '@/types/posting';
import { postingVisibilityLabels } from '@/types/sex';
import { getParticipantCount } from '@/utils/posting-participants';
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

  const participantCount = getParticipantCount(posting);
  const participantText =
    posting.maxParticipants == null
      ? `${participantCount}/∞`
      : `${participantCount}/${posting.maxParticipants}`;

  return (
  <Pressable style={styles.card} onPress={onPress}>
    <ThemedView style={styles.titleRow}>
      <ThemedText
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {posting.title}
      </ThemedText>
      {posting.joined && <JoinedBadge />}
    </ThemedView>

    <ThemedView style={styles.metaRow}>
      <ThemedText style={styles.metaText} numberOfLines={1}>
        {formattedDateTime}
      </ThemedText>

      {posting.distanceMiles !== undefined && (
        <ThemedText style={styles.metaText}>
          {posting.distanceMiles.toFixed(1)} mi
        </ThemedText>
      )}

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
titleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
title: {
  flex: 1,
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