import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import "../constants/global.css";

import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const expo = SQLite.openDatabaseSync("db.db");

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
