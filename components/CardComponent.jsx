import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CardComponent = ({
  question,
  onPress = () => {
    console.log("Card pressed");
  },
  style,
}) => {
  return (
    <View className="">
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl px-4 py-3 shadow-md mb-4 border border-gray-100"
    >
      <Text className="text-lg font-bold text-gray-800 mb-3">{question}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default CardComponent;
