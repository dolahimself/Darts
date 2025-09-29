import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessageProps } from '../types';
import { formatTimestamp } from '../data/mock';

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
  previousMessage,
}) => {
  const showTimestamp =
    !previousMessage ||
    message.timestamp.getTime() - previousMessage.timestamp.getTime() > 300000; // 5 minutes

  return (
    <View style={styles.container}>
      {showTimestamp && (
        <Text style={styles.timestamp}>
          {formatTimestamp(message.timestamp)}
        </Text>
      )}
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserText : styles.otherUserText,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginVertical: 8,
  },
  messageContainer: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 2,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: 'white',
  },
  otherUserText: {
    color: '#000',
  },
});
