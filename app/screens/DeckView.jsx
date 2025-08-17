import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionHeader from "../../components/SectionHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCardsByDeck, useCards, useDeck, useDeckStats } from "../../stores/hooks";

const DeckView = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const { deckId } = useLocalSearchParams();
  const router = useRouter();
  const deckCards = useCardsByDeck(deckId); // This now returns the actual card objects
  const deck = useDeck(deckId); // Get deck info too
  const deckStats = useDeckStats(deckId);
  
  console.log("DeckId:", deckId);
  console.log("Deck Cards:", deckCards);
  console.log("Deck Info:", deck);
  console.log("Deck Stats:", deckStats);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCardPress = (cardId) => {
    setShowAnswer((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const startLearning = () => {
    if (deckId && Object.keys(deckCards).length > 0) {
      router.push({
        pathname: "/screens/Learning",
        params: { deckId: deckId }
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#10b981";
      case "medium":
        return "#f59e0b";
      case "hard":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getDifficultyText = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  // Early return if no deck or cards
  if (!deck || !deckCards) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-xl text-gray-600">Loading deck...</Text>
      </View>
    );
  }

  const cardsArray = Object.values(deckCards);
  const totalCards = cardsArray.length;

  return (
    <View className="flex-1 bg-gray-50">
      <SectionHeader title="Deck Overview" />

      {/* Deck Info Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="px-6 py-4 bg-white mx-4 rounded-2xl shadow-sm border border-gray-100"
      >
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {deck.name}
            </Text>
            <Text className="text-gray-600 text-sm mb-2">
              {deck.description || "No description available"}
            </Text>
            <View className="flex-row items-center">
              <View
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: deck.color }}
              />
              <Text className="text-gray-600">
                {totalCards} cards
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-3xl font-bold text-indigo-600">
              {deckStats ? deckStats.progressPercentage : 0}%
            </Text>
            <Text className="text-gray-500 text-sm">
              {deckStats ? `${deckStats.totalLearned}/${deckStats.totalCards}` : `0/${totalCards}`} completed
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="w-full bg-gray-200 rounded-full h-2">
          <View
            className="bg-indigo-600 h-2 rounded-full"
            style={{ 
              width: `${deckStats ? deckStats.progressPercentage : 0}%` 
            }}
          />
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <View className="px-6 py-4 flex-row space-x-3">
        <TouchableOpacity
          onPress={startLearning}
          disabled={totalCards === 0}
          className={`flex-1 py-3 px-4 rounded-xl flex-row items-center justify-center ${
            totalCards === 0 ? 'bg-gray-400' : 'bg-indigo-600'
          }`}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">
            {totalCards === 0 ? 'No Cards' : 'Start Learning'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white py-3 px-4 rounded-xl border border-gray-200 flex-row items-center justify-center">
          <Ionicons name="add" size={20} color="#6b7280" />
          <Text className="text-gray-600 font-semibold ml-2">Add Card</Text>
        </TouchableOpacity>
      </View>

      {/* Cards Section */}
      <View className="px-6 flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Cards</Text>
        {totalCards === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg">No cards in this deck yet</Text>
            <Text className="text-gray-400 text-sm mt-2">Add some cards to start learning!</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {cardsArray.map((card, idx) => (
              <Animated.View
                key={card.id}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, idx * 20],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCardPress(card.id)}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="text-lg font-semibold text-gray-800 flex-1 mr-3">
                      {card.front}
                    </Text>
                    <View
                      className="px-2 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          getDifficultyColor(card.difficulty || 'medium') + "20",
                      }}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: getDifficultyColor(card.difficulty || 'medium') }}
                      >
                        {getDifficultyText(card.difficulty || 'medium')}
                      </Text>
                    </View>
                  </View>

                  {showAnswer[card.id] && (
                    <Animated.View
                      className="mt-3 pt-3 border-t border-gray-100"
                      style={{
                        opacity: fadeAnim,
                        transform: [{ scale: fadeAnim }],
                      }}
                    >
                      <Text className="text-gray-600 text-base leading-5">
                        {card.back}
                      </Text>
                      {card.lastReviewed && (
                        <Text className="text-gray-400 text-xs mt-2">
                          Last reviewed: {new Date(card.lastReviewed).toLocaleDateString()}
                        </Text>
                      )}
                      {card.reviewCount > 0 && (
                        <Text className="text-gray-400 text-xs mt-1">
                          Reviewed {card.reviewCount} times ({Math.round((card.correctCount / card.reviewCount) * 100)}% correct)
                        </Text>
                      )}
                    </Animated.View>
                  )}

                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                      <Ionicons
                        name={showAnswer[card.id] ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#6b7280"
                      />
                      <Text className="text-gray-500 text-sm ml-1">
                        {showAnswer[card.id] ? "Hide" : "Show"} answer
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DeckView;
