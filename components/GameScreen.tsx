import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function GameScreen() {

  // TODO

  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu</Text>
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontWeight: "bold",
    color: "black"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  }
});
