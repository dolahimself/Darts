// src/data/mockData.ts

import { User, Message, Chat } from '../types';

export const CURRENT_USER_ID = 'current-user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Temie',
    age: 24,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    bio: 'Love hiking, photography, and good coffee ☕',
    distance: 2,
  },
  {
    id: '2',
    name: 'Cuppy',
    age: 26,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Yoga instructor & travel enthusiast 🧘‍♀️✈️',
    distance: 5,
  },
  {
    id: '3',
    name: 'Tolani',
    age: 22,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    bio: 'Artist, dog lover, always up for adventures 🎨🐕',
    distance: 8,
  },
  {
    id: '4',
    name: 'Temsbaby',
    age: 25,
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    bio: 'Marketing professional, foodie, wine enthusiast 🍷',
    distance: 3,
  },
  {
    id: '5',
    name: 'AyraStarr',
    age: 23,
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face',
    bio: 'Medical student, runner, book lover 📚🏃‍♀️',
    distance: 6,
  },
];

export const currentUser: User = {
  id: CURRENT_USER_ID,
  name: 'You',
  age: 25,
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  bio: 'Tech enthusiast, love good music and great company 🎵',
};

const generateMessages = (chatId: string, otherUserId: string): Message[] => {
  const messageTemplates = {
    '1': [
      { text: 'Hey! How are you doing?', senderId: otherUserId },
      {
        text: "Hi! I'm doing great, thanks for asking 😊",
        senderId: CURRENT_USER_ID,
      },
      {
        text: "That's awesome! I saw you like hiking, me too!",
        senderId: otherUserId,
      },
      {
        text: "Really? What's your favorite trail?",
        senderId: CURRENT_USER_ID,
      },
      {
        text: 'I love the Blue Ridge trail. The views are amazing!',
        senderId: otherUserId,
      },
    ],
    '2': [
      { text: 'Your profile caught my eye! 😍', senderId: otherUserId },
      {
        text: 'Thank you! You seem really interesting too',
        senderId: CURRENT_USER_ID,
      },
      {
        text: 'Would you like to grab coffee sometime?',
        senderId: otherUserId,
      },
      { text: "I'd love to! When works for you?", senderId: CURRENT_USER_ID },
    ],
    '3': [
      { text: 'Hi there! 👋', senderId: CURRENT_USER_ID },
      { text: "Hello! How's your day going?", senderId: otherUserId },
      {
        text: 'Pretty good! Just finished a painting session',
        senderId: otherUserId,
      },
      {
        text: 'That sounds amazing! What do you like to paint?',
        senderId: CURRENT_USER_ID,
      },
    ],
  };

  const templates =
    messageTemplates[chatId as keyof typeof messageTemplates] || [];

  return templates.map((template, index) => ({
    id: `${chatId}-msg-${index}`,
    text: template.text,
    senderId: template.senderId,
    timestamp: new Date(Date.now() - (templates.length - index) * 3600000), // Hour intervals
    type: 'text' as const,
  }));
};

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: [currentUser, mockUsers[0]],
    lastMessage: {
      id: '1-last',
      text: 'I love the Blue Ridge trail. The views are amazing!',
      senderId: mockUsers[0].id,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    messages: generateMessages('1', mockUsers[0].id),
    unreadCount: 2,
  },
  {
    id: '2',
    participants: [currentUser, mockUsers[1]],
    lastMessage: {
      id: '2-last',
      text: "I'd love to! When works for you?",
      senderId: CURRENT_USER_ID,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    messages: generateMessages('2', mockUsers[1].id),
    unreadCount: 0,
  },
  {
    id: '3',
    participants: [currentUser, mockUsers[2]],
    lastMessage: {
      id: '3-last',
      text: 'That sounds amazing! What do you like to paint?',
      senderId: CURRENT_USER_ID,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    },
    messages: generateMessages('3', mockUsers[2].id),
    unreadCount: 0,
  },
];

// Helper function to get other user in chat
export const getOtherUser = (chat: Chat, currentUserId: string): User => {
  return (
    chat.participants.find(user => user.id !== currentUserId) || currentUser
  );
};

// Helper function to format timestamp
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return timestamp.toLocaleDateString();
};
