import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { ChatMessage } from '@/types/chat';
import { StyleSheet } from 'react-native';

type MessageBubbleProps = {
  message: ChatMessage;
  isCurrentUser: boolean;
};

export function MessageBubble({
  message,
  isCurrentUser,
}: MessageBubbleProps) {
  return (
    <ThemedView
      style={[
        styles.row,
        isCurrentUser
          ? styles.currentUserRow
          : styles.otherUserRow,
      ]}
    >
      <ThemedView
        style={[
          styles.bubble,
          isCurrentUser
            ? styles.currentUserBubble
            : styles.otherUserBubble,
        ]}
      >
        {!isCurrentUser && (
          <ThemedText style={styles.senderName}>
            {message.senderName}
          </ThemedText>
        )}

        <ThemedText style={styles.messageBody}>
          {message.body}
        </ThemedText>

        <ThemedText style={styles.sentAt}>
          {message.sentAt.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
row: {
    width: '100%',
    marginBottom: 10,
},
currentUserRow: {
    alignItems: 'flex-end',
},
otherUserRow: {
    alignItems: 'flex-start',
},
bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
},
currentUserBubble: {
    backgroundColor: '#D9EAFD',
},
otherUserBubble: {
    backgroundColor: '#E8E8E8',
},
senderName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
},
  messageBody: {
    fontSize: 15,
},
sentAt: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
},
});