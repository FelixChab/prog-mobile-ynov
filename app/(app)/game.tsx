import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/useFirebase";

export default function GameScreen() {
  // TODO: implémenter logique de jeu

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

  // Gestion du meilleur score
  const updateHighScore = async (userId: string, newScore: number) => {
    const userRef = doc(db, "Users", userId)
    await updateDoc(userRef, {
      highScore: newScore,
    })
  }
  
  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I HAVE A MOUTH SO I MUST SCREAM</Text>
      <Image
        style={styles.image}
        source="https://i.ytimg.com/vi/MGs__rwhoEA/maxresdefault.jpg"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={2000}
      />
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    marginBottom: 20,
    fontStyle: "italic",
    borderColor: "#4fbeda",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553"
  }
});
