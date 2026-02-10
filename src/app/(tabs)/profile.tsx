import StatsCard from "@/src/features/home/ui/StatsCard";
import AiBlock from "@/src/features/profile/ui/AiBlock";
import HeaderProfile from "@/src/features/profile/ui/HeaderProfile";
import { useLogout } from "@/src/shared/model/logout";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const logout = useLogout();
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <HeaderProfile />
      <View className="mx-8 -mt-14">
        <StatsCard />
        <AiBlock />
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={logout}
            className="bg-red-50 rounded-2xl py-4 items-center"
          >
            <Text className="text-red-500 font-bold text-base">
              Logout from account
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default Profile;
