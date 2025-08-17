import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import { Provider } from "tinybase/ui-react";

import "../constants/global.css";

import { store, persister, initializeStore } from "../stores/index";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Initialize the store when the app starts
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <Provider store={store}>
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/AddDeck"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/AddCard"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/AddCategory"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/DeckView"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/Learning"
            options={{ headerShown: false }}
          />
        </Stack>
    </Provider>
  );
}
