// src/screens/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  Alert,
  StatusBar,
} from 'react-native';
import { UserCard } from '../components/UserCard';
import { mockUsers } from '../data/mock';
import { User, SwipeAction } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback((action: SwipeAction) => {
    const { direction, user } = action;

    if (direction === 'right') {
      Alert.alert('Match! 💕', `You liked ${user.name}!`, [
        { text: 'Continue' },
      ]);
    }

    setCurrentIndex(prev => prev + 1);
  }, []);

  const renderCards = () => {
    return users
      .slice(currentIndex, currentIndex + 2)
      .map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          onSwipe={handleSwipe}
          isTop={index === 0}
        />
      ));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>🎉 You're all caught up!</Text>
      <Text style={styles.emptySubtitle}>
        Check back later for more potential matches
      </Text>
    </View>
  );

  const hasCards = currentIndex < users.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: useSafeAreaInsets().top }]}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {hasCards ? renderCards() : renderEmptyState()}
      </View>

      <View style={styles.bottomControls}>
        <Text style={styles.instructionText}>
          {hasCards ? 'Swipe right to like, left to pass' : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4458',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
