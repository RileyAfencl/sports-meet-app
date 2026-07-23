import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type DirectMessageHeaderProps = {
  displayName: string;
  onPress: () => void;
};

export default function DirectMessageHeader({
  displayName,
  onPress,
}: DirectMessageHeaderProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <ThemedView style={styles.avatar}>
        <ThemedText style={styles.avatarText}>
          P
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.name}>
        {displayName}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    gap: 10,
},
avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#555',
},
avatarText: {
    fontSize: 13,
    fontWeight: '700',
},
name: {
    fontSize: 16,
    fontWeight: '600',
},
});