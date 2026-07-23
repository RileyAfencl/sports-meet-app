import { ConversationCard } from '@/components/conversation-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { ConversationPreview } from '@/types/chat';
import { type ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

type ConversationPageProps = {
    pageTitle: string;
    conversations: ConversationPreview[];
    conversationButtonLabel?: string;
    renderChatHeader: (
    conversationId: string
  ) => ReactNode;
    onSendMessage: (
    conversationId: string,
    message: string
  ) => void;
};

export default function ConversationPage({
    pageTitle,
    conversations,
    conversationButtonLabel = 'Conversations',
    renderChatHeader,
    onSendMessage,
}: ConversationPageProps) {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState<string>('')
    const [isConversationSidebarOpen, setIsConversationSidebarOpen] = useState(false);

    const isSendDisabled =
        selectedConversationId === null ||
        messageInput.trim().length === 0;


    const handleSendMessage = () => {
        const trimmedMessage = messageInput.trim();

        if (
            selectedConversationId === null ||
            trimmedMessage.length === 0
        ) {
            return;
        }

        onSendMessage(
            selectedConversationId,
            trimmedMessage
        );

        setMessageInput('');
        };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText style={styles.headerText}>
                    {pageTitle}
                </ThemedText>  
            </ThemedView>

            <ThemedView style={styles.content}>

                {isConversationSidebarOpen && (
                <ThemedView style={styles.sidebarContainer}>
                <ThemedView style={styles.sidebarHeader}>
                    <ThemedText style={styles.sidebarTitle}>
                    {conversationButtonLabel}
                    </ThemedText>

                    <Pressable
                    style={styles.closeButton}
                    onPress={() => setIsConversationSidebarOpen(false)}
                    >
                    <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                    </Pressable>
                </ThemedView>

                <ScrollView style={styles.sidebar}
                contentContainerStyle={styles.sidebarContent}
                >
                    {conversations.length === 0 ? (
                    <ThemedView style={styles.emptySidebarContent}>
                        <ThemedText style={styles.emptySidebarText}>
                            No Conversations Yet
                        </ThemedText>
                    </ThemedView>
                    ) : (
                    conversations.map((conversation) => (
                        <ConversationCard
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={
                            selectedConversationId === conversation.id
                        }
                        onPress={() => {
                            setSelectedConversationId(conversation.id);
                            setIsConversationSidebarOpen(false);
                        }}
                        />
                    ))
                    )}
                </ScrollView>
                </ThemedView>
            )}

                <ThemedView style={styles.chatPanel}>
                    <ThemedView style={styles.chatNavigationRow}>
                        <Pressable
                        style={styles.openSidebarButton}
                        onPress={() => setIsConversationSidebarOpen(true)}
                        >
                        <ThemedText style={styles.openSidebarButtonText}>
                            {conversationButtonLabel}
                        </ThemedText>
                        </Pressable>

                        {selectedConversationId !== null && (
                        <ThemedView style={styles.chatHeader}>
                            {renderChatHeader(selectedConversationId)}
                        </ThemedView>
                        )}
                    </ThemedView>

                    <ScrollView
                        style={styles.messages}
                        contentContainerStyle={styles.messagesContent}
                        >
                        {selectedConversationId === null && (
                            <ThemedText style={styles.emptyMessagesText}>
                            Select a conversation to view messages.
                            </ThemedText>
                        )}

                        {/* Real messages come in pass two */}
                    </ScrollView>

                    <ThemedView style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            placeholderTextColor="#888"
                            value={messageInput}
                            onChangeText={setMessageInput}
                            editable={selectedConversationId !== null}
                        />

                        <Pressable
                        style={[
                            styles.sendButton,
                            isSendDisabled && styles.sendButtonDisabled,
                        ]}
                        onPress={handleSendMessage}
                        disabled={isSendDisabled}
                        >
                            <ThemedText style={styles.sendButtonText}>
                            Send
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
floatingOpenButton: {
  position: 'absolute',
  top: 48,
  left: 12,
  width: 40,
  height: 40,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
  backgroundColor: '#fff',
},
container: {
  flex: 1,
},
header: {
    padding: 16,
    alignItems: 'center'
},
headerText: {
  fontSize: 24,
  fontWeight: '700',
},
content: {
    flex: 1,
    flexDirection: 'row',
},
sidebar: {
  flex: 1
},
sidebarContent: {
  flexGrow: 1,
},
emptySidebarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptySidebarText: {
    textAlign: 'center',
    fontSize: 18,
},
sidebarContainer: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '82%',
  maxWidth: 320,
  zIndex: 10,
  borderRightWidth: 1,
  borderRightColor: '#555',
  borderTopWidth: 1,
  borderTopColor: '#555',
},
sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
},
sidebarTitle: {
  fontSize: 18,
  fontWeight: '700',
},
closeButton: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
},
closeButtonText: {
    fontWeight: '600',
},
chatPanel: {
    flex: 1,
},
chatNavigationRow: {
  flexDirection: 'row',
  alignItems: 'stretch',
  paddingHorizontal: 10,
  paddingVertical: 8,
  gap: 8,
  borderTopWidth: 1,
  borderTopColor: '#DDD',
  borderBottomWidth: 1,
  borderBottomColor: '#DDD',
},
openSidebarButton: {
  justifyContent: 'center',
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
},
openSidebarButtonText: {
  fontWeight: '600',
},
chatHeader: {
  flex: 1,
  minWidth: 0,
},
messages: {
    flex: 1,
},
messagesContent: {
  flexGrow: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
},
emptyMessagesText: {
  margin: 'auto',
  textAlign: 'center',
},
inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    gap: 8,
},
input: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#000000',
  flex: 1, 
},
sendButton: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  backgroundColor: '#555',
},
sendButtonText: {
  color: '#FFF',
  fontWeight: '600',
},
sendButtonDisabled: {
  opacity: 0.5,
},
});