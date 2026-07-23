
export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  sentAt: Date;
};

export type ConversationPreview = {
  id: string;
  title: string;
  subtitle: string;
  lastMessageTime: Date;
  unreadCount: number;
  activity?: string;
  scheduledAt?: string;
};