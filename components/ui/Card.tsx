// Card.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface DataNama {
  imageUrl?: string;
  nama: string;
  nim: string;
}

interface CardProps {
  dataNama: DataNama;
}

const Card: React.FC<CardProps> = React.memo(({ dataNama }) => {
  const imageUrl =
    dataNama.imageUrl ||
    "https://avatars.githubusercontent.com/u/116475964?v=4";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatar}
          accessible
          accessibilityLabel={`${dataNama.nama}'s avatar`}
        />

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{dataNama.nama}</Text>
          <Text style={styles.nimText}>{dataNama.nim}</Text>
        </View>
      </View>
    </View>
  );
});

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  innerContainer: {
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRightWidth: 2,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderColor: "black",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
    maxWidth: 180,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  nimText: {
    fontWeight: "400",
    color: "gray",
    marginTop: 4,
  },
});
