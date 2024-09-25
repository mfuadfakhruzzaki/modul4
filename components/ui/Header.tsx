import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

// Optional: If you're using an icon library like react-native-vector-icons
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
  headerIcon?: string; // Icon name from the icon library
  headerText: string;
  flexPosition?: "flex-start" | "center" | "flex-end";
}

const Header: React.FC<HeaderProps> = React.memo(
  ({ headerIcon, headerText, flexPosition = "center" }) => {
    return (
      <View
        style={[styles.headerContainer, { justifyContent: flexPosition }]}
        accessible
        accessibilityRole="header"
      >
        {headerIcon && (
          <FontAwesome
            name={headerIcon as keyof typeof FontAwesome.glyphMap}
            size={24}
            color="#000"
            style={styles.iconStyle}
            accessibilityLabel={`${headerText} icon`}
          />
        )}
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    );
  }
);

export default Header;

// Define styles using StyleSheet for better performance and readability
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 32,
  },
  headerText: {
    marginRight: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#000", // Ensure text color contrasts with background
  },
  iconStyle: {
    marginRight: 8, // Space between icon and text
  },
});
