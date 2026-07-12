import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Profile } from '@/types/profile';
import { sexInitials } from '@/types/sex';

type SearchProfileCardProps = {
  profile: Profile;
  onPress: () => void;
};

export function SearchProfileCard({ profile, onPress }: SearchProfileCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ThemedView style={styles.photoPlaceholder}>
        <ThemedText style={styles.photoText}>Photo</ThemedText>
      </ThemedView>

      <ThemedText style={styles.nameText}>
        {profile.firstName} {profile.lastInitial}. - {sexInitials[profile.sex]}, {profile.age}
      </ThemedText>

      <ThemedText style={styles.matchText}>
        {profile.matchCount} activity {profile.matchCount === 1 ? 'match' : 'matches'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 12,
    padding: Spacing.two,
    alignItems: 'center',
    gap: Spacing.one,
  },
  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontSize: 12,
    opacity: 0.7,
  },
  nameText: {
    fontWeight: '700',
    marginTop: 4,
  },
  matchText: {
    fontSize: 13,
    opacity: 0.8,
  },
});