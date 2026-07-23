import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type PostingChatHeaderProps = {
  title: string;
  activity?: string;
  scheduledAt?: string;
  onPress: () => void;
};

export default function PostingChatHeader({
  title,
  activity,
  scheduledAt,
  onPress,
}: PostingChatHeaderProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <ThemedView style={styles.textContainer}>
            <ThemedText style={styles.title}>
            {title}
            </ThemedText>

            {(activity || scheduledAt) && (
            <ThemedText style={styles.metadata}>
                {[activity, scheduledAt].filter(Boolean).join(' · ')}
            </ThemedText>
            )}
        </ThemedView>
        </Pressable>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
},
textContainer: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
},
title: {
    fontSize: 16,
    fontWeight: '600',
},
metadata: {
    fontSize: 13,
    color: '#888',
    marginTop: 1,
},
});