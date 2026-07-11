import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
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
      ? `${posting.currentParticipants} participants`
      : `${posting.currentParticipants} / ${posting.maxParticipants} participants`;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ThemedText style={styles.title}>
        {posting.title}
      </ThemedText>

      <ThemedText style={styles.activity}>
        {posting.activity}
      </ThemedText>

      <ThemedView style={styles.details}>
        <ThemedText style={styles.detailText}>
          {formattedDateTime}
        </ThemedText>

        <ThemedText style={styles.detailText}>
          {posting.distanceMiles.toFixed(1)} miles away
        </ThemedText>

        <ThemedText style={styles.detailText}>
          {participantText}
        </ThemedText>

        <ThemedText style={styles.detailText}>
            Visibility:{' '}
            {posting.visibility
                .map((value) => postingVisibilityLabels[value])
                .join(', ')}
            </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    padding: Spacing.three,
    marginBottom: Spacing.two,
},
title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
},
activity: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
    color: '#000',
},
details: {
    gap: 4,
},
detailText: {
    fontSize: 13,
    opacity: 0.75,
    color: '#000',
},
});