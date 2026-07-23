import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { ConversationPreview } from '@/types/chat';
import { Pressable, StyleSheet, View } from 'react-native';

type ConversationCardProps = {
  conversation: ConversationPreview;
  isSelected: boolean;
  onPress: () => void;
};

export function ConversationCard({
  conversation,
  isSelected,
  onPress,
}: ConversationCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView
        style={[
          styles.container,
          isSelected && styles.selectedContainer,
        ]}
      >
        <View style={styles.topRow}>
          <ThemedText style={styles.title}>
            {conversation.title}
          </ThemedText>

          <ThemedText style={styles.time}>
            {conversation.lastMessageTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </ThemedText>
        </View>

        
          <ThemedText
            style={styles.subtitle}
            numberOfLines={1}
          >
            {conversation.subtitle}
          </ThemedText>

          {conversation.unreadCount > 0 && (
            <ThemedView style={styles.unreadBadge}>
              <ThemedText style={styles.unreadText}>
                {conversation.unreadCount}
              </ThemedText>
            </ThemedView>
          )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
},
selectedContainer: {
  backgroundColor: '#F2F2F2',
  borderLeftWidth: 4,
  borderLeftColor: '#555',
  paddingLeft: 8,
},
topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
},
bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
},
title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
time: {
    fontSize: 12,
},
subtitle: {
    flex: 1,
    fontSize: 14,
},
unreadBadge: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 11,
    height:22,
    minWidth:22,
    backgroundColor: '#ff0000',
},
unreadText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
},
});