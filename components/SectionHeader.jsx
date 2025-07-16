import { Text, View } from "react-native";

export default function SectionHeader({ title}) {
  return (
    <View className="px-6 pt-12 pb-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-gray-800">{title}</Text>
        <View className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
          <Text className="text-white font-semibold">A</Text>
        </View>
      </View>
    </View>
  );
}
