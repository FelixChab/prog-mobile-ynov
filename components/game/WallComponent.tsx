import { PLAYER_OFFSET } from "@/constants/game";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export default function WallComponent({x, y, wallWidth, wallHeight, playerX }:
{
	x: number,
	y: number,
	wallWidth: number,
	wallHeight: number,
	playerX: number
}) {

    const style = StyleSheet.create({
		background: {
			backgroundColor: "white",
            width: wallWidth,
            height: wallHeight,
			left: x - playerX + PLAYER_OFFSET,
            top: y,
			position: "absolute"
		}
	});

	return (
		<View style={style.background}/>
	);
}