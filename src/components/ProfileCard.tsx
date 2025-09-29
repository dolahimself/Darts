import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ProfileCardProps } from '../types';

export const ProfileCard: React.FC<ProfileCardProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.actionButton}
      onPress={onPress}
    >
      <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
