import React from "react";
import { ScrollView, Text, View } from "react-native";
import Category from "../../components/Category";
import DeckCard from "../../components/DeckCard";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";
import { useCategories, useCategoryDecks } from "../../stores/hooks";

const Home = () => {
  const categories = useCategories();
  const categoryDecks = useCategoryDecks(); // Using the imported hook
  
  const stats = [
    { number: "34", label: "Studied cards", color: "bg-purple-100" },
    { number: "18", label: "Decks created", color: "bg-orange-100" },
  ];

  // Get decks from your store instead of hardcoding
  // Assuming categoryDecks provides the decks data
  const decks = categoryDecks || [
    {
      title: "Fundamentals on Computer Science",
      color: "bg-blue-100",
      id: "1",
      cardsNum: 5,
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    }
  ];

  const handleCreateDeck = () => {
    console.log("Create Deck");
    // Navigate to create deck screen
    // router.push("/create-deck");
  };

  const handleStudyNow = () => {
    console.log("Study Now");
    // Navigate to study screen or show study options
    // router.push("/study");
  };

  // Calculate categories count properly
  const categoriesCount = Object.keys(categories).length;

  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <SectionHeader title={"Home"} />

      {/* Stats Cards */}
      <View className="px-6 mb-8">
        <View className="flex-row gap-2">
          {stats.map((stat, index) => (
            <View
              key={index}
              className={`flex-1 ${stat.color} rounded-2xl p-4`}
            >
              <Text className="text-2xl font-bold text-gray-800">
                {stat.number}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Categories Section */}
      {categoriesCount > 0 && (
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Categories: {categoriesCount} {categoriesCount === 1 ? 'category' : 'categories'}
          </Text>
          <View className="gap-3">
            {Object.entries(categories).map(([categoryId, category]) => (
              <Category
                key={categoryId}
                title={category.name}
                color={category.color}
                id={categoryId}
              />
            ))}
          </View>
        </View>
      )}

      {/* Decks Section */}
      <View className="px-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Decks ({decks.length})
        </Text>
        <View className="gap-4">
          {decks.map((deck, index) => (
            <DeckCard key={deck.id || index} deck={deck} />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <IconedButton
            text="Create Deck"
            icon="plus"
            onPress={handleCreateDeck}
            bgColor="bg-blue-500"
            textColor="text-white"
            iconColor="white"
          />

          <IconedButton
            text="Study Now"
            icon="play"
            onPress={handleStudyNow}
            bgColor="bg-gray-200"
            textColor="text-gray-700"
            iconColor="#374151"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;