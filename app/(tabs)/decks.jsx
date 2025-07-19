import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import SectionHeader from "../../components/SectionHeader";
import { router } from "expo-router";
import DeckCard from "@/components/DeckCard";

import {
  getAllCategories,
  getDecksWithCardCountByCategory,
  getDecksWithCardCount,
  getAllDecks,
} from "../../database/crud";
import IconedButton from "@/components/IconedButton";

const Decks = () => {
  const [fabExpanded, setFabExpanded] = useState(false);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks();
  }, []);


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
    <View className="flex-1">
      <SectionHeader title={"Decks"} />

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">Loading decks...</Text>
        </View>
      )}

      {/* Decks List */}
      {!loading && (
        <ScrollView className="flex-1 px-6">
          {decks.length === 0 ? (
            <View className="flex-1 justify-center items-center py-20">
              <Feather name="inbox" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-center mt-4 text-lg">
                "No decks found"
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Create your first deck to get started!
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {decks.map((deck, index) => (
                <DeckCard
                  key={deck.id}
                  deck_title={deck.name}
                  card_color={deck.color}
                  created_at={formatDate(deck.created_at)}
                  card_count={deck.card_count || 0}
                  category_name={deck.category_name}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-6 items-end">
        {fabExpanded && (
          <View className="mb-4 gap-3">
            <TouchableOpacity
              className="w-44 flex-row items-center bg-white rounded-2xl p-3 shadow-lg mb-2"
              onPress={() => {
                setFabExpanded(false);
                router.push("../screens/AddDeck");
                console.log("Add Deck");
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
                console.log("Add Card");
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
                console.log("Add Category");
              }}
            >
              <Feather name="folder-plus" size={20} color="#f59e42" />
              <Text className="ml-3 text-orange-500 font-semibold">
                Add Category
              </Text>
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
