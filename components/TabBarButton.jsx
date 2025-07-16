import { useLinkBuilder } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
export default function TabBarButton() {
  const { buildHref } = useLinkBuilder();

  return (
    <TouchableWithoutFeedback
      key={route.name}
      android_ripple={null}
      href={buildHref(route.name, route.params)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      className="flex flex-col items-center rounded-full p-1"
    >
      {icon[route.name]({
        color: isFocused ? colors.primary : colors.text,
        size: 20,
      })}

      <Text style={{ color: isFocused ? colors.primary : colors.text }}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
}
