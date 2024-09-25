import React from "react";
import { Tabs } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: "home" | "person" | undefined;

            if (route.name === "index") {
              iconName = "home";
            } else if (route.name === "profile") {
              iconName = "person";
            }

            return (
              <Octicons
                name={iconName}
                size={32}
                color={color}
                style={styles.iconStyle}
              />
            );
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen name="index" options={{ tabBarLabel: "Home" }} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    marginHorizontal: 16,
    borderRadius: 24,
    height: 64,
    marginBottom: 16,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 5,
    // Optional: Adding overflow hidden to ensure shadow visibility with borderRadius
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    marginBottom: -32, // Adjusted to better position the icon within the Tab Bar
  },
});
