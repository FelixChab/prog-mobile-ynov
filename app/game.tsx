import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"

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
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    margin: 0,
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
})
