import React from "react";
import { ScrollView, Text, View } from "react-native";
import Category from "../../components/Category";
import DeckCard from "../../components/DeckCard";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";
import { useCategories, useDecks } from "../../stores/hooks";

const Home = () => {
  const categories = useCategories();
  const allDecks = useDecks();

  const stats = [
    { number: "34", label: "Studied cards", color: "bg-purple-100" },
    {
      number: Object.keys(allDecks).length.toString(),
      label: "Decks created",
      color: "bg-orange-100",
    },
  ];

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
        <View className="px-6 mb-6 flex ">
          <View className="flex flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </Text>
          <Text className="text-lg font-semibold text-gray-800 mb-4">
           {categoriesCount}{" "}
            {categoriesCount === 1 ? "category" : "categories"}
          </Text>
          </View>
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

      {/* Decks Section 
      <View className="px-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Decks
        </Text>
        <View className="gap-4">
          {Object.keys(allDecks).length > 0 ? (
            Object.entries(allDecks).map(([deckId, deck]) => (
              <DeckCard
                key={deckId}
                deck_title={deck.name}
                category_title={categories[deck.categoryId]?.name || "Unknown Category"}
                cards_num={0} // TODO: Implement card count
                created_at={new Date(deck.createdAt).toLocaleDateString()}
                card_color={deck.color}
              />
            ))
          ) : (
            <View className="items-center justify-center py-20">
              <Text className="text-gray-500 text-lg">No decks created yet</Text>
              <Text className="text-gray-400 text-sm mt-2">Create your first deck to get started!</Text>
            </View>
          )}
        </View>
      </View>
*/}
      {/* Quick Actions */}
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <IconedButton
            text="Create Deck"
            icon="plus"
            bgColor="bg-blue-500"
            textColor="text-white"
            iconColor="white"
          />

          <IconedButton
            text="Study Now"
            icon="play"
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
