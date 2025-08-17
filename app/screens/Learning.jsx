import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanGestureHandler,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { 
  useCardsByDeck, 
  useDeck, 
  useLearningSessionManager 
} from "../../stores/hooks";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.25;

const Learning = () => {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);
  const [cardResults, setCardResults] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  
  // Get data from TinyStore
  const deckCards = useCardsByDeck(deckId);
  const deck = useDeck(deckId);
  const { startLearningSession, completeLearningSession, recordCardResult } = useLearningSessionManager();
  
  // Animation values
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (deckId && deckCards && Object.keys(deckCards).length > 0) {
      // Start learning session
      try {
        const newSessionId = startLearningSession(deckId);
        setSessionId(newSessionId);
        setSessionStartTime(Date.now());
        console.log("Started learning session:", newSessionId);
      } catch (error) {
        console.error("Failed to start learning session:", error);
        Alert.alert("Error", "Failed to start learning session");
        router.back();
        return;
      }
    }
  }, [deckId, deckCards]);

  useEffect(() => {
    // Initial card animation
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentCardIndex]);

  const animateCardOut = (direction) => {
    const targetX = direction === 'right' ? width * 1.5 : -width * 1.5;
    const targetY = direction === 'right' ? -height * 0.1 : height * 0.1;
    const targetRotation = direction === 'right' ? 15 : -15;
    
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targetX,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: targetY,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: targetRotation,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      nextCard();
    });
  };

  const nextCard = () => {
    if (!deckCards) return;
    
    const cardsArray = Object.values(deckCards);
    if (currentCardIndex < cardsArray.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
      resetCardAnimation();
    } else {
      // Learning session completed
      showResults();
    }
  };

  const resetCardAnimation = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    scale.setValue(1);
    opacity.setValue(1);
    rotation.setValue(0);
    
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCardResult = async (result) => {
    if (!sessionId || !deckId) return;
    
    const cardsArray = Object.values(deckCards);
    const currentCard = cardsArray[currentCardIndex];
    
    try {
      // Record card result in TinyStore
      await recordCardResult(currentCard.id, deckId, sessionId, result);
      
      // Update local state
      setCardResults(prev => [...prev, { cardId: currentCard.id, result }]);
      
      if (result === 'correct') {
        setLearningProgress(prev => prev + 1);
      }
      
      animateCardOut(result === 'correct' ? 'right' : 'left');
    } catch (error) {
      console.error("Failed to record card result:", error);
      // Continue with animation even if recording fails
      animateCardOut(result === 'correct' ? 'right' : 'left');
    }
  };

  const showResults = async () => {
    if (!sessionId) return;
    
    const correctAnswers = cardResults.filter(r => r.result === 'correct').length;
    const accuracy = Math.round((correctAnswers / cardResults.length) * 100);
    const duration = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 1000) : 0;
    
    try {
      // Complete learning session in TinyStore
      await completeLearningSession(sessionId, correctAnswers, duration);
      console.log("Completed learning session:", sessionId);
    } catch (error) {
      console.error("Failed to complete learning session:", error);
    }
    
    Alert.alert(
      "Learning Session Complete!",
      `You got ${correctAnswers} out of ${cardResults.length} cards correct (${accuracy}% accuracy)`,
      [
        {
          text: "Review Results",
          onPress: () => router.back(),
        },
        {
          text: "Start Over",
          onPress: () => {
            setCurrentCardIndex(0);
            setShowAnswer(false);
            setLearningProgress(0);
            setCardResults([]);
            resetCardAnimation();
            
            // Start new session
            try {
              const newSessionId = startLearningSession(deckId);
              setSessionId(newSessionId);
              setSessionStartTime(Date.now());
            } catch (error) {
              console.error("Failed to start new session:", error);
            }
          },
        },
      ]
    );
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Early return if no data
  if (!deck || !deckCards || Object.keys(deckCards).length === 0) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-xl text-gray-600">No cards available</Text>
      </View>
    );
  }

  const cardsArray = Object.values(deckCards);
  const currentCard = cardsArray[currentCardIndex];
  const progressPercentage = ((currentCardIndex + 1) / cardsArray.length) * 100;

  if (!currentCard) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-xl text-gray-600">Loading card...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1 items-center">
            <Text className="text-lg font-semibold text-gray-800">
              {deck.name}
            </Text>
            <Text className="text-sm text-gray-500">
              Card {currentCardIndex + 1} of {cardsArray.length}
            </Text>
          </View>
          
          <View className="w-8" />
        </View>
        
        {/* Progress Bar */}
        <View className="w-full bg-gray-200 rounded-full h-2">
          <Animated.View 
            className="bg-indigo-600 h-2 rounded-full"
            style={{ 
              width: `${progressPercentage}%`,
              transform: [{ scaleX: scale }]
            }}
          />
        </View>
      </View>

      {/* Card Container */}
      <View className="flex-1 justify-center items-center px-6">
        <PanGestureHandler
          onGestureEvent={(event) => {
            const { translationX, translationY } = event.nativeEvent;
            
            // Update card position based on gesture
            translateX.setValue(translationX);
            translateY.setValue(translationY);
            
            // Add rotation based on horizontal movement
            const rotationValue = translationX * 0.1;
            rotation.setValue(rotationValue);
            
            // Scale down slightly during gesture
            const scaleValue = 1 - Math.abs(translationX) / (width * 2);
            scale.setValue(Math.max(0.8, scaleValue));
          }}
          onEnded={(event) => {
            const { translationX, velocityX } = event.nativeEvent;
            
            if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 500) {
              // Swipe threshold met or fast swipe
              const direction = translationX > 0 ? 'right' : 'left';
              const result = direction === 'right' ? 'correct' : 'incorrect';
              handleCardResult(result);
            } else {
              // Reset card position
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              Animated.spring(rotation, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }
          }}
        >
          <Animated.View
            style={{
              opacity: cardOpacity,
              transform: [
                { translateX },
                { translateY },
                { scale: cardScale },
                { 
                  rotate: rotation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-10deg', '10deg']
                  })
                },
              ],
            }}
            className="w-full max-w-sm"
          >
            {/* Card */}
            <TouchableOpacity
              onPress={toggleAnswer}
              activeOpacity={0.9}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 min-h-[300] justify-center"
            >
              <View className="items-center mb-6">
                <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-3">
                  <Ionicons name="help-circle" size={24} color="#6366f1" />
                </View>
                <Text className="text-sm text-gray-500 font-medium">
                  {showAnswer ? "Answer" : "Question"}
                </Text>
              </View>
              
              <Text className="text-xl font-bold text-gray-800 text-center leading-7 mb-6">
                {showAnswer ? currentCard.back : currentCard.front}
              </Text>
              
              <View className="items-center">
                <View className="px-3 py-1 bg-gray-100 rounded-full">
                  <Text className="text-xs text-gray-600 font-medium">
                    {showAnswer ? "Tap to hide" : "Tap to reveal answer"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>

        {/* Swipe Instructions */}
        <View className="mt-6 flex-row items-center space-x-6">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-2">
              <Ionicons name="arrow-back" size={16} color="#ef4444" />
            </View>
            <Text className="text-sm text-gray-600">Swipe left for incorrect</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-2">
              <Ionicons name="arrow-forward" size={16} color="#10b981" />
            </View>
            <Text className="text-sm text-gray-600">Swipe right for correct</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {showAnswer && (
          <Animated.View 
            style={{ opacity: cardOpacity }}
            className="flex-row space-x-4 mt-8"
          >
            <TouchableOpacity
              onPress={() => handleCardResult('incorrect')}
              className="bg-red-500 px-8 py-4 rounded-2xl flex-row items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={24} color="white" />
              <Text className="text-white font-semibold ml-2 text-lg">Incorrect</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleCardResult('correct')}
              className="bg-green-500 px-8 py-4 rounded-2xl flex-row items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark" size={24} color="white" />
              <Text className="text-white font-semibold ml-2 text-lg">Correct</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Learning Stats */}
        <View className="mt-8 bg-white rounded-2xl p-4 w-full max-w-sm">
          <View className="flex-row justify-between items-center">
            <View className="items-center">
              <Text className="text-2xl font-bold text-indigo-600">
                {learningProgress}
              </Text>
              <Text className="text-sm text-gray-500">Correct</Text>
            </View>
            
            <View className="w-px h-8 bg-gray-200" />
            
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-600">
                {cardResults.length}
              </Text>
              <Text className="text-sm text-gray-500">Answered</Text>
            </View>
            
            <View className="w-px h-8 bg-gray-200" />
            
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-600">
                {cardsArray.length - currentCardIndex - 1}
              </Text>
              <Text className="text-sm text-gray-500">Remaining</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Learning;
