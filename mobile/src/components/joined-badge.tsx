import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type JoinedBadgeProps = {
  style?: StyleProp<ViewStyle>;
};

export function JoinedBadge({ style }: JoinedBadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <ThemedText style={styles.badgeText}>Joined</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#15803d',
  },
});
