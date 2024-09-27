import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Vibration, // Import Vibration API
} from "react-native";
import Header from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Define TypeScript interface for user data
interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const MAX_COUNT = 12;
const MIN_COUNT = 1;

export default function HomeScreen() {
  const [data, setData] = useState<UserData | null>(null);
  const [count, setCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  // Fetch user data whenever 'count' changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://reqres.in/api/users/${count}`
        );
        setData(response.data.data);
      } catch (error: any) {
        Alert.alert("Error", error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [count]);

  // Alert and Vibration when reaching the end
  useEffect(() => {
    if (count === MAX_COUNT) {
      // Trigger vibration
      Vibration.vibrate([500]);

      // Show alert
      Alert.alert("End of List", "You have reached the last user.");
      setHasReachedEnd(true);
    } else {
      setHasReachedEnd(false);
    }
  }, [count]);

  // Handler to go to the previous user
  const prevButtonHandler = useCallback(() => {
    setCount((prev) => Math.max(prev - 1, MIN_COUNT));
  }, []);

  // Handler to go to the next user
  const nextButtonHandler = useCallback(() => {
    if (count < MAX_COUNT) {
      setCount((prev) => prev + 1);
    } else {
      // Optionally, you can uncomment the line below if you want to alert when trying to go beyond
      Alert.alert("End of List", "You have already reached the last user.");
    }
  }, [count]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerIcon="bell-o"
        headerText={`Hi, ${data ? data.first_name : "User"}`}
        flexPosition="flex-start"
      />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : data ? (
          <View style={styles.userContainer}>
            <Image source={{ uri: data.avatar }} style={styles.avatar} />
            <Text style={styles.name}>
              {data.first_name} {data.last_name}
            </Text>
            <Text style={styles.email}>{data.email}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No user data available.</Text>
        )}
        <View style={styles.buttonContainer}>
          {count > MIN_COUNT && (
            <TouchableOpacity onPress={prevButtonHandler} style={styles.button}>
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={nextButtonHandler}
            style={[
              styles.button,
              count === MAX_COUNT && styles.disabledButton,
            ]}
            disabled={count === MAX_COUNT}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Define styles using StyleSheet for better performance and readability
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 12,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
  },
  disabledButton: {
    borderColor: "gray",
  },
  buttonText: {
    color: "black",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
  },
});
