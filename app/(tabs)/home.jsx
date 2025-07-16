import React from "react";
import { ScrollView, Text, View } from "react-native";
import Category from "../../components/Category";
import IconedButton from "../../components/IconedButton";
import SectionHeader from "../../components/SectionHeader";
const Home = () => {
  const stats = [
    { number: "34", label: "Studied cards", color: "bg-purple-100" },
    { number: "18", label: "Decks created", color: "bg-orange-100" },
  ];

  const classes = [
    {
      title: "Fundamentals on Computer Science",
      instructor: "Cody Fisher",
      category: "Programming",
      categoryColor: "bg-blue-100 text-blue-600",
    },
    {
      title: "Knowledge about Environmental & Science",
      instructor: "Jacob Jones",
      category: "Knowledge",
      categoryColor: "bg-green-100 text-green-600",
    },
  ];

  return (
    <ScrollView className="flex-1">
      {/* Header */}

      <SectionHeader title={"Home"} />

      {/* Stats Cards */}
      <View className="px-6 mb-8">
        <View className="flex-row gap-2">
          {stats.map((stat, index) => (
            <View
              key={index}
              className={`flex-1 ${stat.color} rounded-2xl p-4`}
            >
              <Text className="text-2xl font-bold text-gray-800">
                {stat.number}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Classes Section */}
      <View className="px-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Topics</Text>
        <View className="gap-4">
          {classes.map((classItem, index) => (
            <Category
              key={index}
              category={classItem.category}
              categoryColor={classItem.categoryColor}
              title={classItem.title}
              onPress={() => console.log("Card pressed:", classItem.title)}
            />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <IconedButton
        text="Create Deck"
        icon="plus"
        onPress={() => console.log("Create Deck")}
        bgColor="bg-blue-500"
        textColor="text-white"
        iconColor="white"
      />

      <IconedButton
        text="Study Now"
        icon="play"
        onPress={() => console.log("Study Now")}
        bgColor="bg-gray-200"
        textColor="text-gray-700"
        iconColor="#374151"
      />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
