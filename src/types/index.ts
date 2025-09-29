// src/types/index.ts

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio?: string;
  distance?: number;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  type?: 'text' | 'image';
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  messages: Message[];
  unreadCount?: number;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  ChatDetail: { chatId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Chats: undefined;
  Profile: undefined;
};

// Gesture Types
export interface SwipeAction {
  direction: 'left' | 'right';
  user: User;
}

// Component Props Types
export interface UserCardProps {
  user: User;
  onSwipe: (action: SwipeAction) => void;
  isTop?: boolean;
}

export interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  previousMessage?: Message;
}

export interface ChatListItemProps {
  chat: Chat;
  onPress: () => void;
}

export interface ProfileCardProps {
  text: string;
  onPress: () => void;
}
