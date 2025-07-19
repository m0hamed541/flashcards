import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import Category from "../../components/Category";
import DeckCard from "../../components/DeckCard";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";
import { getAllDecks } from "@/database/crud";

const Home = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    loadDecks();
  }, []);
  const stats = [
    { number: "34", label: "Studied cards", color: "bg-purple-100" },
    { number: decks.length, label: "Decks created", color: "bg-orange-100" },
  ];
  const loadDecks = async () => {
    try {
      setLoading(true);
      let loadedDecks;
      loadedDecks = await getAllDecks();
      setDecks(loadedDecks);
    } catch (err) {
      console.error("Error loading decks:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return "Unknown";
    }
  };

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

      {/* Classes Section */}
      <View className="px-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Decks</Text>
        <View className="gap-4">
          {loading ? (
            <View className="flex-1 justify-center items-center bg-gray-50">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-gray-600 mt-4 text-base">
                Loading your decks...
              </Text>
            </View>
          ) : decks.length > 0 ? (
            decks.map((deck) => (
              <DeckCard
                key={deck.id}
                deck_title={deck.name}
                card_color={deck.color}
                created_at={formatDate(deck.created_at)}
                card_count={deck.card_count || 0}
                category_name={deck.category_name}
              />
            ))
          ) : (
            <View className="py-8 px-4 bg-gray-50 rounded-2xl items-center">
              <Text className="text-gray-500 text-base mb-2">No decks yet</Text>
              <Text className="text-gray-400 text-sm text-center">
                Create your first deck to get started with studying!
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <IconedButton
            text="Create Deck"
            icon="plus"
            onPress={() => console.log("Create Deck")}
            bgColor="bg-blue-500"
            textColor="text-white"
            iconColor="white"
          />

          <IconedButton
            text="Study Now"
            icon="play"
            onPress={() => console.log("Study Now")}
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
