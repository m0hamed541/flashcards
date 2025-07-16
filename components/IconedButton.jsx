import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function IconedButton({
  text,
  icon,
  onPress,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  iconColor = "white",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 ${bgColor} rounded-2xl p-4 flex-row items-center justify-center`}
    >
      <Feather name={icon} size={20} color={iconColor} />
      <Text className={`font-semibold ml-2 ${textColor}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
