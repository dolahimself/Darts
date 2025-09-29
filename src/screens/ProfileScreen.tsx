import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { currentUser } from '../data/mock';
import Ionicons from '@react-native-vector-icons/ionicons';
import { ProfileCard } from '../components/ProfileCard';

export const ProfileScreen: React.FC = () => {
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings feature coming soon!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Logged out', 'You have been logged out successfully!');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSettings}
          style={styles.settingsButton}
        >
          <Ionicons name={'settings'} size={25} color={'#666'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: currentUser.avatar }}
            style={styles.profilePhoto}
          />
          <TouchableOpacity activeOpacity={0.85} style={styles.editPhotoButton}>
            <Ionicons name={'camera'} size={18} color={'#fff'} />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.age}>Age: {currentUser.age}</Text>
          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <ProfileCard text={'Edit Profile'} onPress={handleEditProfile} />
          <ProfileCard text={'Discovery Preferences'} onPress={() => {}} />
          <ProfileCard text={'Privacy Settings'} onPress={() => {}} />
          <ProfileCard text={'Chat Settings'} onPress={() => {}} />
          <ProfileCard text={'Notifications'} onPress={() => {}} />
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Likes Given</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Active Chats</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.aboutText}>
            The demo dating app built by \DOLA.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  photoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    position: 'relative',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2.5,
    borderColor: '#FF4458',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 30,
    right: '37.5%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  infoSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  age: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4458',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  logoutButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FF4458',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomSpacing: {
    height: 30,
  },
});
