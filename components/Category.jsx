import { Text, TouchableOpacity, View } from "react-native";

export default function Category({
  category,
  categoryColor,
  title,
  instructor,
  onPress,
}) {
  // category {title, color, }
  const [bgColor, textColor] = categoryColor.split(" ");

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 shadow-sm"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className={`px-3 py-1 rounded-full ${bgColor}`}>
          <Text className={`text-xs font-medium ${textColor}`}>{category}</Text>
        </View>
      </View>

      <Text className="text-base font-semibold text-gray-800 mb-2">
        {title}
      </Text>
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-600 mr-4">
          12 cards
        </Text>
        <Text className="text-sm text-gray-600">12</Text>
      </View>
    </TouchableOpacity>
  );
}
