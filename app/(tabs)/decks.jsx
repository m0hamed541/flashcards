import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import SectionHeader from "../../components/SectionHeader";

const Decks = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Science & Environment"
  );

  const categories = [
    "Science & Environment",
    "Programming",
    "Mathematics",
    "History",
    "Languages",
  ];

  const decks = [
    {
      title: "Art",
      progress: 4,
      total: 82,
      color: "bg-blue-100",
      progressColor: "bg-blue-500",
    },
    {
      title: "Earth Science",
      progress: 0,
      total: 60,
      color: "bg-green-100",
      progressColor: "bg-green-500",
    },
    {
      title: "Countries on a Map",
      progress: 0,
      total: 39,
      color: "bg-purple-100",
      progressColor: "bg-purple-500",
    },
    {
      title: "Musicians",
      progress: 0,
      total: 76,
      color: "bg-orange-100",
      progressColor: "bg-orange-500",
    },
    {
      title: "Vocal Workout",
      progress: 0,
      total: 68,
      color: "bg-pink-100",
      progressColor: "bg-pink-500",
    },
  ];

  return (
    <View className="flex-1">
      {/* Header */}
      <SectionHeader title={"Decks"} />

      {/* Category Tabs */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((category, index) => (
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
          {decks.map((deck, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800 mb-2">
                    {deck.title}
                  </Text>
                  <View className="flex-row items-center">
                    <View
                      className={`w-full h-2 ${deck.color} rounded-full mr-3`}
                    >
                      <View
                        className={`h-2 ${deck.progressColor} rounded-full`}
                        style={{
                          width: `${(deck.progress / deck.total) * 100}%`,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-gray-800">
                    {deck.progress}/{deck.total}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-6">
        <TouchableOpacity className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Decks;
