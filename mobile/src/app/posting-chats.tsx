import ConversationPage from '@/components/conversation-page';
import PostingChatHeader from '@/components/posting-chat-header';
import { Sidebar } from '@/components/sidebar';
import { ThemedView } from '@/components/themed-view';
import { mockPostingChats } from '@/mock-data/mock-posting-chats';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostingChatsPage() {
  return (
<ThemedView style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.page}>
        
        <ConversationPage
          pageTitle="Posting Chats"
          conversations={mockPostingChats}
          conversationButtonLabel="Posting Chats"
          renderChatHeader={(conversationId) => {
            const conversation = mockPostingChats.find(
                conversation => conversation.id === conversationId
            );

            if (!conversation) {
                return null;
            }

            return (
                <PostingChatHeader
                    title={conversation.title}
                    activity={conversation.activity}
                    scheduledAt={conversation.scheduledAt}
                    onPress={() => {
                        console.log('Open posting');
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