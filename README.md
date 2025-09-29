# 💕 Darts Dating App

A modern, feature-rich dating application built with React Native and TypeScript, featuring swipeable user cards, real-time messaging, and beautiful UI/UX design.

![React Native](https://img.shields.io/badge/React_Native-0.72.6-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8.4-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📱 Features

- 🔥 **Dating-App-Style Swiping** - Smooth card animations with like/dislike gestures
- 💬 **Real-Time Chat Interface** - Beautiful messaging UI with auto-responses
- 🧭 **Bottom Tab Navigation** - Easy navigation between Discover, Messages, and Profile
- 👤 **User Profiles** - View and manage user information
- 📊 **User Statistics** - Track your matches and interactions
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all device sizes

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **React Native CLI** - Install with: `npm install -g react-native-cli`
- **Android Studio** (for Android development) - [Download here](https://developer.android.com/studio)
- **Xcode** (for iOS development, Mac only) - Available on Mac App Store

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dolahimself/Darts.git
   cd Darts
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (Mac only)**

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro Bundler**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the app**

   **For Android:**

   ```bash
   npm run android
   # or
   yarn android
   ```

   **For iOS (Mac only):**

   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📖 How to Use the App

### 1. 🏠 **Home Screen **

This is where you'll find potential matches!

#### How to Swipe:

- **👉 Swipe Right** - Like a user

  - Drag the card to the right
  - You'll see a green "LIKE" indicator appear
  - Release when the card is past the threshold
  - A match alert will appear!

- **👈 Swipe Left** - Pass on a user

  - Drag the card to the left
  - You'll see a red "NOPE" indicator appear
  - Release when the card is past the threshold
  - The card will disappear

#### Tips:

- The card under the top card is slightly visible - that's your next match!
- Quick flicks work too - you don't need to drag all the way
- The card rotates as you drag for a natural feel
- When you run out of cards, you'll see a "All caught up!" message

### 2. 💬 **Chats Screen **

View all your conversations in one place!

#### Features:

- **Chat List** - See all your matches and conversations

  - Red dot indicates unread messages
  - Badge shows unread message count
  - Last message preview
  - Timestamp shows when the last message was sent

- **Opening a Chat**
  - Tap any conversation to open it
  - You'll see the full chat history
  - Messages are styled differently:
    - Your messages: Blue bubbles on the right
    - Their messages: Gray bubbles on the left

#### How to Send Messages:

1. Type your message in the text input at the bottom
2. Tap the "Send" button (or press Enter)
3. Your message appears instantly
4. The other person will respond automatically (demo feature!)

#### Tips:

- Scroll up to see older messages
- The chat auto-scrolls to the latest message
- Timestamps show when messages were sent
- The back arrow (←) takes you back to the chat list

### 3. 👤 **Profile Screen**

Manage your profile and app settings!

#### What You Can Do:

- **View Your Profile**

  - Profile photo with camera icon (for editing)
  - Name and age display
  - Personal bio
  - Location information

- **View Statistics**

  - Likes Given - How many people you've liked
  - Matches - Total number of matches
  - Active Chats - Conversations in progress

- **Quick Actions**

  - ✏️ Edit Profile - Update your information
  - 🎯 Discovery Preferences - Set matching preferences
  - 🔒 Privacy Settings - Control who sees what
  - 💬 Chat Settings - Customize your chat experience
  - 📱 Notifications - Manage notification preferences

- **Other Options**
  - View app information and version
  - Logout button at the bottom

#### Tips:

- Tap any option to access that feature
- The settings icon (⚙️) in the top right provides additional settings
- Your profile photo can be changed by tapping the camera icon

## 🛠️ Troubleshooting

### App Won't Start?

```bash
# Clear cache and restart
npx react-native start --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..
npm run android

# Clean iOS build (Mac only)
cd ios && xcodebuild clean && cd ..
npm run ios
```

## 📂 Project Structure

```
Darts/
├── src/
│   ├── components/          # Reusable components
│   │   ├── UserCard.tsx     # Swipeable card component
│   │   └── ChatMessage.tsx  # Chat message bubble
│   │   └── ProfileCard.tsx  # Profile Navigation Card component
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx   # Discover/swipe screen
│   │   ├── ChatsScreen.tsx  # Chat list screen
│   │   ├── ChatDetailScreen.tsx  # Individual chat
│   │   └── ProfileScreen.tsx     # User profile
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx # Navigation configuration
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   └── data/                # Mock data
│       └── mock.ts          # Sample users and chats
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # App entry point
├── package.json             # Dependencies
└── tsconfig.json             # TypeScript config
```

## 🎨 Customization

### Change App Colors

Edit the color values in the component style sheets:

```typescript
// Primary color (pink/red)
color: '#FF4458';

// Success color (green for likes)
color: '#4CAF50';

// Error color (red for passes)
color: '#F44336';
```

## 📱 Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### Android App Bundle (for Play Store)

```bash
cd android
./gradlew bundleRelease

# Bundle location:
# android/app/build/outputs/bundle/release/app-release.aab
```

### iOS (Mac only)

```bash
# Open in Xcode
open ios/Darts.xcworkspace

# Select Product > Archive
# Then follow the export wizard
```

## 🔒 Privacy & Data

- **No Backend** - All data is stored locally (mock data)
- **No Analytics** - No user tracking or analytics
- **No Authentication** - Demo app without login
- **Safe Testing** - All features work offline

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Tech Stack:

- React Native 0.72.6
- TypeScript 4.8.4
- React Navigation
- React Native Gesture Handler
- React Native Reanimated

**Enjoy! 💕**

Made with React Native and TypeScript by \DOlA
