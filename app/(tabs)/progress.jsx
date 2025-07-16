import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SectionHeader from "../../components/SectionHeader";

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  const periods = ["Day", "Week", "Month", "Year"];

  const stats = [
    { label: "Cards Studied", value: "156", change: "+12%", color: "text-green-500" },
    { label: "Study Time", value: "2.5h", change: "+8%", color: "text-green-500" },
    { label: "Accuracy", value: "87%", change: "-3%", color: "text-red-500" },
    { label: "Streak", value: "7 days", change: "+2", color: "text-green-500" },
  ];

  const recentActivity = [
    {
      deck: "Computer Science Fundamentals",
      time: "2 hours ago",
      score: "92%",
      cards: 24,
      color: "bg-blue-100"
    },
    {
      deck: "Environmental Science",
      time: "Yesterday",
      score: "85%",
      cards: 18,
      color: "bg-green-100"
    },
    {
      deck: "Mathematics Basics",
      time: "2 days ago",
      score: "78%",
      cards: 32,
      color: "bg-purple-100"
    },
    {
      deck: "Art History",
      time: "3 days ago",
      score: "94%",
      cards: 15,
      color: "bg-orange-100"
    }
  ];

  const achievements = [
    { title: "First Deck", description: "Created your first deck", unlocked: true },
    { title: "Study Streak", description: "7 days in a row", unlocked: true },
    { title: "Quick Learner", description: "100% accuracy on 50 cards", unlocked: false },
    { title: "Dedicated", description: "Study for 30 days", unlocked: false }
  ];

  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <SectionHeader title = {"Progress"}/>
      {/* Period Selector */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-white rounded-full p-1">
          {periods.map((period, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-full ${
                selectedPeriod === period ? "bg-blue-500" : ""
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  selectedPeriod === period ? "text-white" : "text-gray-600"
                }`}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats Grid */}
      <View className="px-6 mb-8">
        <View className="flex-row flex-wrap -mx-2">
          {stats.map((stat, index) => (
            <View key={index} className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-2xl p-4 shadow-sm">
                <Text className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">{stat.label}</Text>
                <Text className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-6 mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-800">Recent Activity</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">View All</Text>
          </TouchableOpacity>
        </View>
        <View className="gap-4">
          {recentActivity.map((activity, index) => (
            <View key={index} className="bg-white rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800 mb-1">
                    {activity.deck}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-gray-600 mr-4">
                      {activity.cards} cards
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {activity.time}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className={`${activity.color} px-3 py-1 rounded-full`}>
                    <Text className="text-sm font-medium text-gray-700">
                      {activity.score}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

export default Progress;