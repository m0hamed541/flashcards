import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function DeckCard({
  deck_title = "Sample deck",
  category_title = "sample category",
  cards_num = 3,
  created_at = new Date().toLocaleDateString(),
  category_color = "#3498db", // Default color
  card_color = "#ffffff", // Default card color
  card_text_color = "#d400ffff", // Default text color
  deckId,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/screens/DeckView",
          params: { deckId: deckId },
        });
      }}
      className="bg-white rounded-2xl p-4 shadow-sm"
      style={{ backgroundColor: card_color, color: card_text_color }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View
          className={"px-3 py-1 rounded-sm"}
          style={{ backgroundColor: category_color }}
        >
          <Text className={"text-xs font-medium text-white"}>
            {category_title}
          </Text>
        </View>
      </View>

      <Text className="text-base font-semibold text-gray-800 mb-2">
        {deck_title}
      </Text>
      <View className="flex-row justify-between">
        {cards_num > 0 && (
          <Text className="text-sm text-gray-600">{cards_num} cards</Text>
        )}
        {created_at && (
          <Text className="text-sm text-gray-600">
            created at : {created_at}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
