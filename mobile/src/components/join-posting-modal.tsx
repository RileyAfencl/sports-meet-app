import { Modal, Pressable, StyleSheet, } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Posting } from '@/types/posting';
import { postingVisibilityLabels } from '@/types/sex';

type JoinPostingModalProps = {
  posting: Posting | null;
  visible: boolean;
  joinPostingChat: boolean;
  onJoinPostingChatChange: (value: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function JoinPostingModal({
  posting,
  visible,
  joinPostingChat,
  onJoinPostingChatChange,
  onCancel,
  onConfirm,
}: JoinPostingModalProps) {
  if (!posting) {
    return null;
  }

  const visibilityText = posting.visibility
    .map((value) => postingVisibilityLabels[value])
    .join(', ');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={styles.title}>
            Join Posting
          </ThemedText>

          <ThemedText style={styles.postingTitle}>
            {posting.title}
          </ThemedText>

          <ThemedText style={styles.warningText}>
            By joining this posting, you acknowledge that your
            profile will be visible to anyone who can view this
            posting. Direct Message permissions will remain unchanged. 
          </ThemedText>

          <ThemedText style={styles.visibilityText}>
            Posting visibility: {visibilityText}
          </ThemedText>

          <Pressable
            style={styles.chatOption}
            onPress={() =>
              onJoinPostingChatChange(!joinPostingChat)
            }
          >
            <ThemedView
              style={[
                styles.checkbox,
                joinPostingChat && styles.checkboxSelected,
              ]}
            >
              {joinPostingChat && (
                <ThemedText style={styles.checkmark}>
                  ✓
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={styles.chatOptionText}>
              <ThemedText style={styles.chatOptionTitle}>
                Join posting chat
              </ThemedText>

              <ThemedText style={styles.chatOptionDescription}>
                Receive access to the temporary chat for this
                posting.
              </ThemedText>
            </ThemedView>
          </Pressable>

          <ThemedView style={styles.buttonRow}>
            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <ThemedText style={styles.cancelButtonText}>
                Cancel
              </ThemedText>
            </Pressable>

            <Pressable
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <ThemedText style={styles.confirmButtonText}>
                Confirm
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 18,
},
  modalContainer: {
    width: '100%',
    borderRadius: 14,
    padding: 18,
    backgroundColor: '#fff',
},
title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
},
postingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
    marginBottom: 16,
},
warningText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
},
visibilityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginTop: 12,
},
chatOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
},
checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
checkboxSelected: {
    backgroundColor: '#d418d4',
    borderColor: '#d418d4',
},
checkmark: {
    color: '#fff',
    fontWeight: '800',
},
chatOptionText: {
    flex: 1,
},
chatOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
},
chatOptionDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#000',
    opacity: 0.65,
    marginTop: 2,
},
buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
},
cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
},
confirmButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#d418d4',
},
cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
},
confirmButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
},
});