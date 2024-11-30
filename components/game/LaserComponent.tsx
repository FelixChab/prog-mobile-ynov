import { LASER_WEIGHT, PLAYER_OFFSET } from "@/constants/game";
import { StyleSheet, View } from "react-native";

export default function LaserComponent({x, playerX}: {x: number, playerX: number}) {

    const style = StyleSheet.create({
		laser: {
			backgroundColor: "red",
			width: LASER_WEIGHT,
            height: "100%",
            position: "absolute",
			left: x - playerX + PLAYER_OFFSET,
			top: 0
		}
	});

	return (
		<View style={style.laser}/>
	)
}