import { ConversationPreview } from "@/types/chat";

export const mockPostingChats: ConversationPreview[] = [
    {
        id: '1',
        title: 'Basketball at the Park',
        subtitle: 'See you soon!',
        lastMessageTime: new Date(),
        unreadCount: 4,
        activity: 'Basketball',
        scheduledAt: 'July 15th, 6:30 PM'
    },
    {
        id: '2',
        title: 'Pickelball at Dans',
        subtitle: 'Ill bring shoes!',
        lastMessageTime: new Date(),
        unreadCount: 21,
        activity: 'Pickelball',
        scheduledAt: 'July 25th, 6:00 PM'
    },
    {
        id: '3',
        title: 'Lifting',
        subtitle: 'Its legs day!',
        lastMessageTime: new Date(),
        unreadCount: 212,
        activity: 'Lifting',
        scheduledAt: 'July 27th, 6:00 PM'
    },
    {
        id: '4',
        title: 'Baseball at Grandview',
        subtitle: 'Ill bring an extra glove!',
        lastMessageTime: new Date(),
        unreadCount: 212,
        activity: 'Baseball',
        scheduledAt: 'July 19th, 7:00 PM'
    },
    {
        id: '5',
        title: 'Rugby at Grandview',
        subtitle: 'It should be teams of 4 I think.',
        lastMessageTime: new Date(),
        unreadCount: 0,
        activity: 'Rugby',
        scheduledAt: 'July 19th, 2:00 PM'
    },
    {
        id: '6',
        title: 'Bowling at Lilac Lanes',
        subtitle: 'We have 3 lanes!',
        lastMessageTime: new Date(),
        unreadCount: 4,
        activity: 'Bowling',
        scheduledAt: 'July 21st, 2:00 PM'
    },
];