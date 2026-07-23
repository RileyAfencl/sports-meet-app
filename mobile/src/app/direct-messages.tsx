import ConversationPage from '@/components/conversation-page';
import DirectMessageHeader from '@/components/direct-message-header';
import { Sidebar } from '@/components/sidebar';
import { ThemedView } from '@/components/themed-view';
import { mockConversations } from '@/mock-data/mock-conversations';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DirectMessagesPage() {
  return (
<ThemedView style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.page}>
        
        <ConversationPage
          pageTitle="Direct Messages"
          conversations={mockConversations}
          renderChatHeader={(conversationId) => {
            const conversation = mockConversations.find(
                conversation => conversation.id === conversationId
            );

            if (!conversation) {
                return null;
            }

            return (
                <DirectMessageHeader
                    displayName={conversation.title}
                    onPress={() => {
                        console.log('Open profile');
                    }}
                />
            );
        }}
          onSendMessage={(conversationId, message) => {
            console.log('Send direct message:', {
              conversationId,
              message,
            });
          }}
        />
      </ThemedView>
    </SafeAreaView>
    <Sidebar />
</ThemedView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
safeArea: {
    flex: 1,
},
page: {
    flex: 1,
    flexDirection: 'row',
},
});