import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Alert } from "react-native";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";

import DeckCard from "../../components/DeckCard";
import DropDownSelector from "../../components/DropDownSelector";
import ColorPicker from "../../components/ColorPicker";
import SaveButton from "../../components/Button";
import Button from "../../components/Button";
import { router } from "expo-router";
import { useStoreActions, useCategories } from "../../stores/hooks";

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

const AddDeck = () => {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const { addDeck } = useStoreActions();
  const categories = useCategories();

  // Convert categories to the format expected by DropDownSelector
  const categoryOptions = Object.entries(categories).reduce((acc, [id, category]) => {
    acc[id] = category.name;
    return acc;
  }, {});

  // Fixed form validation logic
  const isFormValid = deckName.trim() !== "" && selectedCategory !== null;

  // handle submit
  const handleSaveDeck = async () => {
    if (!isFormValid) return;

    try {
      setIsSaving(true);
      
      // Add the deck to the store
      const deckId = addDeck({
        name: deckName.trim(),
        description: deckDescription.trim(),
        categoryId: selectedCategory,
        color: selectedColor,
      });

      console.log(`Deck saved successfully with ID: ${deckId}`);
      
      // Navigate back
      router.back();
    } catch (error) {
      console.error('Error saving deck:', error);
      Alert.alert(
        'Error',
        'Failed to save deck. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSaving(false);
    }
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

          <Text className="text-base font-semibold mb-2">Description (Optional)</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Enter deck description"
            value={deckDescription}
            onChangeText={setDeckDescription}
            multiline
            numberOfLines={3}
          />

          <Text className="text-base font-semibold mb-2">Category</Text>
          <DropDownSelector
            options={categoryOptions}
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
                ? categoryOptions[selectedCategory]
                : "category title"
            }
            cards_num={0}
            created_at={new Date().toLocaleDateString()}
            card_color={selectedColor}
          />

          <Button
            title={"save deck"}
            onPress={handleSaveDeck}
            isLoading={isSaving}
            disabled={!isFormValid}
          />
        </View>
      </View>
    </>
  );
};

export default AddDeck;
