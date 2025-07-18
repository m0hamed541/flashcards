import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import SectionHeader from "../../components/SectionHeader";
import ColorPicker from "../../components/ColorPicker";
import Button from "../../components/Button";

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

const AddCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [isSaving, setIsSaving] = useState(false);

  const isFormValid = categoryTitle.trim() !== "";
  return (
    <>
      <View className="flex flex-col justify-between h-full bg-white">
        <SectionHeader title={"Add Category"} />
        <View className="flex-1 p-6">
          <Text className="text-base font-semibold mb-2">Category Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Enter category name"
            value={categoryTitle}
            onChangeText={setCategoryTitle}
          />

          <Text className="text-base font-semibold mb-2">Color</Text>
          <ColorPicker
            colors={COLOR_OPTIONS}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />

          <Button
            title={"save category"}
            isLoading={isSaving}
            disabled={!isFormValid}
            onPress={() => {
              console.log(`save category:
  Category Title: ${categoryTitle}
  Selected Color: ${selectedColor}`);
              router.back();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AddCategory;
