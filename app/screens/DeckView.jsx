import React from "react";
import { View, Text, ScrollView } from "react-native";
import SectionHeader from "../../components/SectionHeader";
import CardComponent from "../../components/CardComponent";

const mockDeck = {
  title: "Sample Deck",
  progress: 4,
  total: 10,
  cards: [
    {
      question: "What is React?",
      answer: "A JavaScript library for building UIs.",
    },
    { question: "What is a component?", answer: "A reusable piece of UI." },
    {
      question: "What is state?",
      answer: "A way to manage dynamic data in a component.",
    },
  ],
};

const DeckView = () => {
  return (
    <View className="flex-1 bg-white">
      <SectionHeader title={mockDeck.title} />
      <View className="px-6 mt-4 mb-2">
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {mockDeck.title}
        </Text>
        <Text className="text-gray-600 mb-4">
          Progress: {mockDeck.progress}/{mockDeck.total}
        </Text>
      </View>
      <ScrollView className="px-6">
        {mockDeck.cards.map((card, idx) => (
          <CardComponent
            key={idx}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DeckView;
