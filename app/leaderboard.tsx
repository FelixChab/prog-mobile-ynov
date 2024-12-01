import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Pressable } from "react-native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/useFirebase";
import { router } from "expo-router";


export default function ScoreScreen() {
  const [scores, setScores] = useState<{ id: string; username: string; highestScore: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Appel de la méthode de récupération des scores
  useEffect(() => {
    async function fetchData() {
      const fetchedScores = await fetchHighestScores()
      setScores(fetchedScores)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Chargement de la page
  if (isLoading) {
    return <Text>Chargement des scores...</Text>
  }

  // Récupération des scores utilisateurs
  async function fetchHighestScores() {
    try {
      const dbScores = query(
        collection(db, "Users"),
        orderBy("highestScore", "desc")
      );
      const q = await getDocs(dbScores);
      const highestScores = q.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id, // ID unique Firestore
          username: userData.username,
          highestScore: userData.highestScore
        }
      });
      return highestScores;
    } catch (error) {
      Alert.alert("Erreur lors de la récupération des scores :" + error);
      return [];
    }
  }

  // Rendu composants
  return (
    <View style={styles.background}>
      <Pressable onPress={() => router.replace("/")} style={styles.return}>
        <Text style={styles.returnText}>Back</Text>
      </Pressable>
      <Text style={styles.title}>- SCORES -</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>#</Text>
          <Text style={[styles.cell, styles.header]}>Nom</Text>
          <Text style={[styles.cell, styles.header]}>Score</Text>
        </View>
        <ScrollView contentContainerStyle={styles.rows}>
          {scores.splice(0, 10).map((user, index) => (
            <View key={user.id} style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{user.username}</Text>
              <Text style={styles.cell}>{user.highestScore}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// Style CSS
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 20
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50
  },
  table: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#ddd"
  },
  rows: {
    height: "100%"
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    color: "#333",
    fontSize: 16
  },
  header: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold"
  },
  return: {
    position: "absolute",
    top: 0,
    left: 0,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    elevation: 3,
    backgroundColor: "black",
    borderRadius: 1
  },
  returnText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "white"
  }
});
