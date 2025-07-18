import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";

const AddCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deck, setDeck] = useState(null); 
  const isFormValid = question.trim() !== "" && answer.trim() !== "";

  return (
    <View className="flex-1 bg-white">
      <SectionHeader title="Add Card" />
      <View className="flex-1 p-6">
        <Text className="text-base font-semibold text-gray-700">Question</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="Enter question"
          value={question}
          onChangeText={setQuestion}
        />
        <Text className="text-base font-semibold text-gray-700 mt-4">Answer</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="Enter answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <Button
            title={"save card"}
            isLoading={isSaving}
            disabled={!isFormValid}
            onPress={() => {
              console.log(`save card:
              Question: ${question}
              Answer: ${answer}
              Deck: ${deck}`);
              router.back();
            }}
          />
      </View>
    </View>
  );
};

export default AddCard;
 

