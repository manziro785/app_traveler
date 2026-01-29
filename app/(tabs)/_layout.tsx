import { Tabs } from "expo-router";
import { Home, LucideIcon, Map, Route, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const TabBarIcon = ({
  focused,
  color,
  size,
  Icon,
}: {
  focused: boolean;
  color: string;
  size: number;
  Icon: LucideIcon;
}) => (
  <View
    className={`
      p-2.5 
      rounded-2xl 
      ${focused ? "bg-blue-600 shadow-lg mb-5" : "bg-transparent mb-0"}
    `}
    style={{
      shadowColor: focused ? "#000" : "transparent",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: focused ? 8 : 0,
    }}
  >
    <Icon color={focused ? "#FFFFFF" : color} size={size} />
  </View>
);

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFFF",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon {...props} Icon={Home} />,
        }}
      />
      <Tabs.Screen
        name="route"
        options={{
          title: "Маршруты",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon {...props} Icon={Route} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Карта",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon {...props} Icon={Map} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon {...props} Icon={User} />,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
