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
      <View style={styles.buttonContainer}>
        <Pressable style={styles.newGame} onPress={onRestartPress}>
            <Text style={styles.newGameText}>Restart a new game</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/")} style={styles.return}>
            <Text style={styles.returnText}>Title screen</Text>
        </Pressable>
      </View>
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        height: "100%",
    },
    score: {
        fontSize: 80,
        fontWeight: "900",
        color: "white"
    },
    buttonContainer: {
        margin: "5%",
        width: "40%",
        display: "flex"
    },
    newGame: {
        padding: 10,
        margin: 5,
        borderColor: "white",
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    newGameText: {
        fontWeight: 800,
        fontSize: 20,
        color: "white"
    },
    return: {
        padding: 10,
        margin: 5,
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    returnText: {
        fontWeight: 800,
        fontSize: 20,
        color: "black"
    }
});