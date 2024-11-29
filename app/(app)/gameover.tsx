import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function gameOver() {
    const { score } = useLocalSearchParams();

    const style = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            gap: 80
        },
        score: {
            fontSize: 80,
            fontWeight: "900"
        }
    });

    const onRestartPress = () => {
        router.replace("/game");
    }

	return (
		<View style={style.container}>
            <Text style={style.score}>Score: {score}</Text>
            <Button onPress={onRestartPress} title="Restart a new game"></Button>
        </View>
	);
}