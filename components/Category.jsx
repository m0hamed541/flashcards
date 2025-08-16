import { Text, TouchableOpacity, View } from "react-native";

export default function Category({
  category,
  categoryColor = "#73acd3ff #ffffff",
  color, // Alternative prop for color (matches your Home component usage)
  title,
  onPress,
  id,
}) {
  // Use color prop if provided, otherwise use categoryColor
  const colorString = color || categoryColor;
  const [bgColor, textColor = "#ffffff"] = colorString.split(" ");
  
  // If category object is passed, extract data from it
  const categoryTitle = title || category?.title || category?.name;
  const cardsCount = category?.cardsCount || category?.cards?.length || 12; // fallback to 12
  const decksCount = category?.decksCount || category?.decks?.length || 12; // fallback to 12

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(id || category?.id)}
      className="rounded-2xl p-4 shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      <Text 
        className="text-base font-semibold mb-2"
        style={{ color: textColor }}
      >
        {categoryTitle}
      </Text>
      <View className="flex-row items-center">
        <Text 
          className="text-sm mr-4"
          style={{ color: textColor, opacity: 0.8 }}
        >
          {cardsCount} cards
        </Text>
        <Text 
          className="text-sm"
          style={{ color: textColor, opacity: 0.8 }}
        >
          {decksCount} decks
        </Text>
      </View>
    </TouchableOpacity>
  );
}