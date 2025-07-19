import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import "../constants/global.css";

import { initializeDatabase } from "../database/initialization";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Initialize database when component mounts
  useEffect(() => {
    initializeDatabase();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack options={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/AddDeck" options={{ headerShown: false }} />
        <Stack.Screen name="screens/AddCard" options={{ headerShown: false }} />
        <Stack.Screen name="screens/AddCategory" options={{ headerShown: false }} />
        <Stack.Screen name="screens/DeckView" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}