import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

export default function gameOver() {
    const { score } = useLocalSearchParams();

    const onRestartPress = () => {
        router.replace("/game");
    }

	return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Button onPress={onRestartPress} title="Restart a new game"></Button>
      <Pressable onPress={() => router.replace("/")} style={styles.return}>
        <Text style={styles.returnText}>Retour</Text>
      </Pressable>
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 80
    },
    score: {
        fontSize: 80,
        fontWeight: "900"
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
        borderRadius: 1,
    },
    returnText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "bold",
        letterSpacing: 0.3,
        color: "white",
    }
});