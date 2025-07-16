import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import "../constants/global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
