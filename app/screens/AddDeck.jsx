import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";

import DeckCard from "../../components/DeckCard";
import DropDownSelector from "../../components/DropDownSelector";
import ColorPicker from "../../components/ColorPicker";
import SaveButton from "../../components/Button";
import Button from "../../components/Button";
import { router } from "expo-router";

const COLOR_OPTIONS = [
  "#2196F3",
  "#4CAF50",
  "#FF9800",
  "#E91E63",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#8BC34A",
  "#FFC107",
  "#795548",
];

const CATEGORY_OPTIONS = {
  1: "Language Learning",
  2: "Science",
  3: "Mathematics",
  4: "History",
  5: "Technology",
};

const AddDeck = () => {
  const [deckName, setDeckName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fixed form validation logic
  const isFormValid = deckName.trim() !== "" && selectedCategory !== null;

  // handle submit
  const handleSaveDeck = function (deck_title, category, deck_color) {
    console.log(`save deck:
  Deck Title: ${deck_title}
  Category: ${JSON.stringify(category, null, 2)}
  Deck Color: ${deck_color}`);
  };

  return (
    <>
      <View className="flex flex-col justify-between h-full bg-white">
        <SectionHeader title={"Add Deck"} />
        <View className="flex-1 p-6">
          <Text className="text-base font-semibold mb-2">Deck Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Enter deck name"
            value={deckName}
            onChangeText={setDeckName}
          />

          <Text className="text-base font-semibold mb-2">Category</Text>
          <DropDownSelector
            options={CATEGORY_OPTIONS}
            placeholder="Select a category"
            selectedOption={selectedCategory}
            onSelect={(option) => {
              console.log("Selected category:", option);
              setSelectedCategory(option.key);
            }}
          />

          <Text className="text-base font-semibold mb-2">Color</Text>
          <ColorPicker
            colors={COLOR_OPTIONS}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />

          <Text className="text-base font-semibold mb-2">Preview</Text>
          <DeckCard
            deck_title={deckName ? deckName : "Sample Deck"}
            category_title={
              selectedCategory
                ? CATEGORY_OPTIONS[selectedCategory]
                : "category title"
            }
            cards_num={3}
            created_at={new Date().toLocaleDateString()}
            card_color={selectedColor}
          />

          <Button
            title={"save deck"}
            onPress={(deck_title, category, deck_color) => {
              handleSaveDeck(
                (deck_title = deckName),
                (category = selectedCategory),
                (deck_color = selectedColor)
              );
              router.replace("/(tabs)/home");
            }}
            isLoading={isSaving}
            disabled={!isFormValid} // Fixed: disabled when form is NOT valid
          />
        </View>
      </View>
    </>
  );
};

export default AddDeck;
