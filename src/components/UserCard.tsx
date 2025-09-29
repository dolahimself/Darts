import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SwipeAction, UserCardProps } from '../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;
const SWIPE_THRESHOLD = 120;
const SWIPE_VELOCITY_THRESHOLD = 800;
const ROTATION_FACTOR = 0.08;
const ANIMATION_DURATION = 250;

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onSwipe,
  isTop = false,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const isAnimating = useRef(false);

  const resetCard = useCallback(() => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(rotate, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimating.current = false;
    });
  }, [translateX, translateY, rotate, scale]);

  const animateOffScreen = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating.current) return;

      isAnimating.current = true;
      const toValue =
        direction === 'right' ? screenWidth * 1.5 : -screenWidth * 1.5;
      const rotationValue = direction === 'right' ? 1.5 : -1.5;

      Animated.parallel([
        Animated.timing(translateX, {
          toValue,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: rotationValue,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.85,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset all values for next card
        translateX.setValue(0);
        translateY.setValue(0);
        rotate.setValue(0);
        opacity.setValue(1);
        scale.setValue(1);
        isAnimating.current = false;

        const action: SwipeAction = { direction, user };
        onSwipe(action);
      });
    },
    [translateX, translateY, rotate, opacity, scale, onSwipe, user],
  );

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true },
  );

  const handleStateChange = useCallback(
    (event: any) => {
      if (!isTop || isAnimating.current) return;

      const { state, translationX, velocityX, translationY } =
        event.nativeEvent;

      if (state === State.ACTIVE) {
        Animated.spring(scale, {
          toValue: 0.97,
          tension: 100,
          friction: 7,
          useNativeDriver: true,
        }).start();
      } else if (state === State.END) {
        const isHorizontalSwipe =
          Math.abs(translationX) > Math.abs(translationY);
        const hasEnoughDistance = Math.abs(translationX) > SWIPE_THRESHOLD;
        const hasEnoughVelocity =
          Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD;

        const shouldSwipe =
          isHorizontalSwipe && (hasEnoughDistance || hasEnoughVelocity);

        if (shouldSwipe) {
          const direction = translationX > 0 ? 'right' : 'left';
          animateOffScreen(direction);
        } else {
          resetCard();
        }
      } else if (state === State.CANCELLED || state === State.FAILED) {
        resetCard();
      }
    },
    [isTop, animateOffScreen, resetCard, scale],
  );

  useEffect(() => {
    const listener = translateX.addListener(({ value }) => {
      const rotationValue = (value * ROTATION_FACTOR) / CARD_WIDTH;
      rotate.setValue(rotationValue);
    });

    return () => {
      translateX.removeListener(listener);
    };
  }, [translateX, rotate]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-2, -1, 0, 1, 2],
    outputRange: ['-20deg', '-10deg', '0deg', '10deg', '20deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const likeScale = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0.8, 1.1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD / 2, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const nopeScale = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1.1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}
      enabled={isTop && !isAnimating.current}
      activeOffsetX={[-10, 10]}
      failOffsetY={[-40, 40]}
      shouldCancelWhenOutside={false}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX },
              { translateY },
              { rotate: rotateInterpolate },
              { scale },
            ],
            opacity,
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
        <Animated.View
          style={[
            styles.indicator,
            styles.likeIndicator,
            {
              opacity: likeOpacity,
              transform: [{ scale: likeScale }],
            },
          ]}
        >
          <View style={styles.indicatorContent}>
            <Text style={[styles.indicatorText, styles.likeText]}>LIKE</Text>
          </View>
        </Animated.View>

        {/* Nope indicator */}
        <Animated.View
          style={[
            styles.indicator,
            styles.nopeIndicator,
            {
              opacity: nopeOpacity,
              transform: [{ scale: nopeScale }],
            },
          ]}
        >
          <View style={styles.indicatorContent}>
            <Text style={[styles.indicatorText, styles.nopeText]}>NOPE</Text>
          </View>
        </Animated.View>

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
      </Animated.View>
    </PanGestureHandler>
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
