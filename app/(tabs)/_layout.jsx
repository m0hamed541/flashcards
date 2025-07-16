import BottomNavigationBar from "@/components/BottomNavigationBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs tabBar={(props) => <BottomNavigationBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="decks"
          options={{
            title: "Decks",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            headerShown: false,
          }}
        />
      </Tabs>
  );
}
