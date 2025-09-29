import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SwipeAction, UserCardProps } from '../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;
const SWIPE_THRESHOLD = 120;
const SWIPE_VELOCITY_THRESHOLD = 800;
const ANIMATION_DURATION = 250;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
  mass: 1,
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onSwipe,
  isTop = false,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isAnimating = useSharedValue(false);

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      const action: SwipeAction = { direction, user };
      onSwipe(action);
    },
    [onSwipe, user],
  );

  const animateOffScreen = useCallback(
    (direction: 'left' | 'right') => {
      'worklet';
      if (isAnimating.value) return;

      isAnimating.value = true;
      const toValue =
        direction === 'right' ? screenWidth * 1.5 : -screenWidth * 1.5;

      translateX.value = withTiming(
        toValue,
        { duration: ANIMATION_DURATION },
        finished => {
          if (finished) {
            translateX.value = 0;
            translateY.value = 0;
            scale.value = 1;
            isAnimating.value = false;
            runOnJS(handleSwipeComplete)(direction);
          }
        },
      );

      scale.value = withTiming(0.85, { duration: ANIMATION_DURATION });
    },
    [translateX, translateY, scale, isAnimating, handleSwipeComplete],
  );

  const resetCard = useCallback(() => {
    'worklet';

    isAnimating.value = true;

    translateX.value = withSpring(0, SPRING_CONFIG, finished => {
      if (finished) {
        isAnimating.value = false;
      }
    });
    translateY.value = withSpring(0, SPRING_CONFIG);
    scale.value = withSpring(1, SPRING_CONFIG);
  }, [translateX, translateY, scale, isAnimating]);

  const panGesture = Gesture.Pan()
    .enabled(isTop)
    .onStart(() => {
      'worklet';

      if (isAnimating.value) {
        isAnimating.value = false;
      }
      scale.value = withSpring(0.97, SPRING_CONFIG);
    })
    .onUpdate(event => {
      'worklet';

      if (!isAnimating.value) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      'worklet';

      if (isAnimating.value) return;

      const isHorizontalSwipe =
        Math.abs(event.translationX) > Math.abs(event.translationY);
      const hasEnoughDistance = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      const hasEnoughVelocity =
        Math.abs(event.velocityX) > SWIPE_VELOCITY_THRESHOLD;

      const shouldSwipe =
        isHorizontalSwipe && (hasEnoughDistance || hasEnoughVelocity);

      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        animateOffScreen(direction);
      } else {
        resetCard();
      }
    })
    .onFinalize(() => {
      'worklet';

      if (!isAnimating.value) {
        scale.value = withSpring(1, SPRING_CONFIG);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-CARD_WIDTH, 0, CARD_WIDTH],
      [-20, 0, 20],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value },
      ],
    };
  });

  const animatedLikeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
      [0, 0.5, 1],
      Extrapolate.CLAMP,
    );

    const likeScale = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0.8, 1.1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale: likeScale }],
    };
  });

  const animatedNopeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD / 2, 0],
      [1, 0.5, 0],
      Extrapolate.CLAMP,
    );

    const nopeScale = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1.1, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale: nopeScale }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Reanimated.View
        style={[
          styles.card,
          animatedCardStyle,
          {
            zIndex: isTop ? 100 : 1,
            elevation: isTop ? 10 : 5,
          },
        ]}
      >
        <Image
          source={{ uri: user.avatar }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Like indicator */}
        <Reanimated.View
          style={[styles.indicator, styles.likeIndicator, animatedLikeStyle]}
        >
          <View style={styles.indicatorContent}>
            <Text style={[styles.indicatorText, styles.likeText]}>LIKE</Text>
          </View>
        </Reanimated.View>

        {/* Nope indicator */}
        <Reanimated.View
          style={[styles.indicator, styles.nopeIndicator, animatedNopeStyle]}
        >
          <View style={styles.indicatorContent}>
            <Text style={[styles.indicatorText, styles.nopeText]}>NOPE</Text>
          </View>
        </Reanimated.View>

        {/* User info */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={styles.age}>{user.age}</Text>
          </View>
          {user.distance && (
            <Text style={styles.distance} numberOfLines={1}>
              📍 {user.distance} km away
            </Text>
          )}
          {user.bio && (
            <Text style={styles.bio} numberOfLines={2} ellipsizeMode="tail">
              {user.bio}
            </Text>
          )}
        </View>
      </Reanimated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '75%',
  },
  infoContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
    gap: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  age: {
    fontSize: 22,
    color: '#666',
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  bio: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
  },
  indicator: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 4,
  },
  likeIndicator: {
    right: 30,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  nopeIndicator: {
    left: 30,
    borderColor: '#F44336',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  indicatorContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorText: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  likeText: {
    color: '#4CAF50',
  },
  nopeText: {
    color: '#F44336',
  },
});
