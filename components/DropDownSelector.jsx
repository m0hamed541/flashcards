import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const DropDownSelector = function ({
  options = {
    "1": "option 1",
    "2": "option 2", 
    "3": "option 3",
  },
  onSelect = (option) => {
    //console.log("Selected option:", option);
  },
  selectedOption = null,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert dictionary to array format for easier handling
  const optionsArray = Object.entries(options).map(([key, value]) => ({
    key: key,
    value: value
  }));

  const selectedItem = optionsArray.find(option => option.key === selectedOption);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View className="relative mb-4">
      {/* Dropdown Header */}
      <TouchableOpacity
        className="border border-gray-300 rounded-lg px-4 py-3 bg-white flex-row justify-between items-center"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-gray-700">
          {selectedItem ? selectedItem.value : placeholder}
        </Text>
        <Text className={`text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </Text>
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
          {optionsArray.map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`px-4 py-3 border-b border-gray-200 last:border-b-0 ${
                selectedOption === option.key ? "bg-green-50" : "bg-white"
              }`}
              onPress={() => handleSelect(option)}
            >
              <Text className={`${
                selectedOption === option.key ? "text-green-600 font-medium" : "text-gray-700"
              }`}>
                {option.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropDownSelector;