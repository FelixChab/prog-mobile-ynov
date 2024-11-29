import { PLAYER_OFFSET } from "@/constants/game";
import { StyleSheet, View } from "react-native";

export default function PlayerComponent({x, y, size}: {x: number, y: number, size: number}) {

    const style = StyleSheet.create({
		player: {
			borderRadius: "50%",
			backgroundColor: "white",
			width: size,
			height: size,
			top: y,
			left: PLAYER_OFFSET
		}
	});

	return (
		<View style={style.player}/>
	);
}