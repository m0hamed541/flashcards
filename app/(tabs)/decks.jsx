import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import SectionHeader from "../../components/SectionHeader";
import { router } from "expo-router";
import DeckCard from "@/components/DeckCard";
import { useCategories, useDecks, useCategoryDecks, useCardsByDeck } from "../../stores/hooks";

const Decks = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fabExpanded, setFabExpanded] = useState(false);

  const categories = useCategories();
  const allDecks = useDecks();
  
  // Get category names for the tabs
  const categoryNames = Object.values(categories).map(category => category.name);
  
  // Set initial selected category to first available category
  React.useEffect(() => {
    if (categoryNames.length > 0 && !selectedCategory) {
      setSelectedCategory(categoryNames[0]);
    }
  }, [categoryNames, selectedCategory]);

  // Filter decks by selected category
  const categoryId = Object.keys(categories).find(key => categories[key].name === selectedCategory);
  const filteredDecks = categoryId 
    ? Object.entries(allDecks).filter(([_, deck]) => deck.categoryId === categoryId)
    : [];

  // Helper function to get card count for a deck
  const getDeckCardCount = (deckId) => {
    const deckCards = useCardsByDeck(deckId);
    return Object.keys(deckCards).length;
  };

  //console.log("Categories:", categories);
  //console.log("All decks:", allDecks);
  //console.log("Selected category:", selectedCategory);
  //console.log("Filtered decks:", filteredDecks);

  return (
    <View className="flex-1">
      {/* Header */}
      <SectionHeader title={"Decks"} />

      {/* Category Tabs */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categoryNames.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category ? "bg-blue-500" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedCategory === category
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Decks List */}
      <ScrollView className="flex-1 px-6">
        <View className="gap-4">
          {filteredDecks.length > 0 ? (
            filteredDecks.map(([deckId, deck]) => {
              const cardCount = getDeckCardCount(deckId);
              return (
                <DeckCard
                  key={deckId}
                  deckId={deckId}
                  deck_title={deck.name}
                  category_title={categories[deck.categoryId]?.name || "Unknown Category"}
                  cards_num={cardCount}
                  created_at={new Date(deck.createdAt).toLocaleDateString()}
                  card_color={deck.color}
                />
              );
            })
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-gray-500 text-lg">No decks in this category yet</Text>
              <Text className="text-gray-400 text-sm mt-2">Create your first deck!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-6 items-end">
        {fabExpanded && (
          <View className="mb-4 gap-3">
            <TouchableOpacity
              className="w-44 flex-row items-center bg-white rounded-2xl p-3 shadow-lg mb-2"
              onPress={() => {
                setFabExpanded(false);
                router.push("../screens/AddDeck");
                //console.log("Add Deck");
              }}
            >
              <Feather name="plus-square" size={20} color="#2563eb" />
              <Text className="ml-3 text-blue-700 font-semibold">Add Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-44 flex-row items-center bg-white rounded-2xl p-3 shadow-lg mb-2"
              onPress={() => {
                setFabExpanded(false);
                router.push("../screens/AddCard");
                //console.log("Add Card");
              }}
            >
              <Feather name="file-plus" size={20} color="#22c55e" />
              <Text className="ml-3 text-green-600 font-semibold">
                Add Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-44 flex-row items-center bg-white rounded-2xl p-3 shadow-lg"
              onPress={() => {
                setFabExpanded(false);
                router.push("../screens/AddCategory");
                //console.log("Add Category");
              }}
            >
              <Feather name="folder-plus" size={20} color="#f59e42" />
              <Text className="ml-3 text-orange-500 font-semibold">Add Category</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
          onPress={() => setFabExpanded((prev) => !prev)}
        >
          <Feather name={fabExpanded ? "x" : "plus"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Decks;
