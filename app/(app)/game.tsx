import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Image } from "expo-image";

export default function GameScreen() {
  
  // TODO: implémenter logique de jeu

  const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  
  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I HAVE A MOUTH SO I MUST SCREAM</Text>
      <Image
        style={styles.image}
        source="https://i.ytimg.com/vi/MGs__rwhoEA/maxresdefault.jpg"
        placeholder={{blurhash}}
        contentFit="cover"
        transition={1000}
      />
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    margin: 0,
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  }
})
