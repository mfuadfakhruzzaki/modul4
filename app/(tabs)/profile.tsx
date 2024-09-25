import React, { useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from "react-native";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import { data } from "@/constants/data";

// Define TypeScript interface for data items
interface DataItem {
  id: number;
  nama: string;
  nim: string;
  // Add other relevant fields based on your data structure
  // e.g., email: string;
}

export default function ProfileScreen() {
  // Memoize the renderItem function to prevent unnecessary re-renders
  const renderItem: ListRenderItem<DataItem> = useCallback(
    ({ item }) => <Card dataNama={item} />,
    []
  );

  // Optional: Memoize keyExtractor if necessary
  const keyExtractor = useCallback((item: DataItem) => item.id.toString(), []);

  // Optional: Render a component when the list is empty
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No profiles available.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Kelompok 10" flexPosition="center" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        contentContainerStyle={data.length === 0 && styles.flatListContainer}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
}

// Define styles using StyleSheet for better performance and readability
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16, // Adjusted to use SafeAreaView's padding
    backgroundColor: "#fff", // Ensure a consistent background color
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});
