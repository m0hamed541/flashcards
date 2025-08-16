import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";
import DropDownSelector from "../../components/DropDownSelector";
import { useStoreActions, useDecks } from "../../stores/hooks";

const AddCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const { addCard } = useStoreActions();
  const decks = useDecks();
  const params = useLocalSearchParams();
  
  // If a deckId is passed as a parameter, use it
  useEffect(() => {
    if (params.deckId) {
      setSelectedDeck(params.deckId);
    }
  }, [params.deckId]);

  // Convert decks to the format expected by DropDownSelector
  const deckOptions = Object.entries(decks).reduce((acc, [id, deck]) => {
    acc[id] = deck.name;
    return acc;
  }, {});

  const isFormValid = question.trim() !== "" && answer.trim() !== "" && selectedDeck !== null;

  const handleSaveCard = async () => {
    if (!isFormValid) return;

    try {
      setIsSaving(true);
      
      // Add the card to the store
      const cardId = addCard({
        front: question.trim(),
        back: answer.trim(),
        deckId: selectedDeck,
      });

      console.log(`Card saved successfully with ID: ${cardId}`);
      
      // Navigate back
      router.back();
    } catch (error) {
      console.error('Error saving card:', error);
      Alert.alert(
        'Error',
        'Failed to save card. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SectionHeader title="Add Card" />
      <View className="flex-1 p-6">
        {!params.deckId && (
          <>
            <Text className="text-base font-semibold text-gray-700 mb-2">Deck</Text>
            <DropDownSelector
              options={deckOptions}
              placeholder="Select a deck"
              selectedOption={selectedDeck}
              onSelect={(option) => {
                console.log("Selected deck:", option);
                setSelectedDeck(option.key);
              }}
            />
          </>
        )}
        
        <Text className="text-base font-semibold text-gray-700 mb-2">Question</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base mb-4"
          placeholder="Enter question"
          value={question}
          onChangeText={setQuestion}
          multiline
          numberOfLines={3}
        />
        
        <Text className="text-base font-semibold text-gray-700 mb-2">Answer</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base mb-6"
          placeholder="Enter answer"
          value={answer}
          onChangeText={setAnswer}
          multiline
          numberOfLines={3}
        />
        
        <Button
          title={"save card"}
          isLoading={isSaving}
          disabled={!isFormValid}
          onPress={handleSaveCard}
        />
      </View>
    </View>
  );
};

export default AddCard;
 

