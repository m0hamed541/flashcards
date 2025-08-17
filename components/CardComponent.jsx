import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardComponent = ({
  question,
  answer,
  difficulty = "medium",
  lastReviewed,
  onPress = () => {
    //console.log("Card pressed");
  },
  style,
  showAnswer = false,
  onToggleAnswer,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (onToggleAnswer) {
      onToggleAnswer();
    } else {
      onPress();
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
      >
        {/* Header with difficulty badge */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <Text className="text-lg font-semibold text-gray-800 leading-6">
              {question}
            </Text>
          </View>
          
          <View 
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: getDifficultyColor(difficulty) + '20' }}
          >
            <Text 
              className="text-xs font-medium"
              style={{ color: getDifficultyColor(difficulty) }}
            >
              {getDifficultyText(difficulty)}
            </Text>
          </View>
        </View>

        {/* Answer section (if showAnswer is true) */}
        {showAnswer && answer && (
          <Animated.View 
            className="mt-3 pt-3 border-t border-gray-100"
            style={{
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }}
          >
            <Text className="text-gray-600 text-base leading-5">
              {answer}
            </Text>
            {lastReviewed && (
              <Text className="text-gray-400 text-xs mt-2">
                Last reviewed: {lastReviewed}
              </Text>
            )}
          </Animated.View>
        )}

        {/* Footer with action hint */}
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center">
            <Ionicons 
              name={showAnswer ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#6b7280" 
            />
            <Text className="text-gray-500 text-sm ml-1">
              {showAnswer ? "Hide" : "Show"} answer
            </Text>
          </View>
          
          {lastReviewed && !showAnswer && (
            <Text className="text-gray-400 text-xs">
              {lastReviewed}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardComponent;
