import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function BottomNavigationBar({
  state,
  descriptors,
  navigation,
}) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icon = {
    home: (props) => <Feather name="home" {...props} />,
    decks: (props) => <Feather name="copy" {...props} />,
    progress: (props) => <Feather name="activity" {...props} />,
  };

  return (
    <View className="w-full flex flex-col items-center justify-center">
      <View className="bg-white flex-row justify-between p-2 px-6 bottom-8 rounded-full border border-blue-500"
        style={{
          width: "80%",
        }}
      >
        {state.routes.map((route, index) => {
          console.log(route);
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
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
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
