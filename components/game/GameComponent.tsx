import { StyleSheet, useWindowDimensions, View, Text } from "react-native";
import { frame_update } from "@/engine/logics";
import { useEffect, useState } from "react";
import SoundLevel from "react-native-sound-level";
import { GameObject } from "@/engine/game-objects/game_object";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerComponent from "./PlayerComponent";
import WallComponent from "./WallComponent";
import { PLAYER_OFFSET, PLAYER_SIZE, SCORE_MULT } from "@/constants/game";
import { Wall } from "@/engine/game-objects/wall";
import { useGround } from "@/hooks/useGround";
import { AudioModule } from "expo-audio";
import { router } from "expo-router";


export default function GameComponent() {
	// sound capture managment
	let amplitude = -100;

	useEffect(() => {
		(async () => {
			const permission = await AudioModule.requestRecordingPermissionsAsync();
			if (permission.granted) {
				SoundLevel.start();
				SoundLevel.onNewFrame = (data) => {
					amplitude = data.value;
				}
			}
		})();

		return () => SoundLevel.stop();
	}, []);
	
	// game managment
	const { width, height } = useWindowDimensions();
	const [gameLoop, setGameLoop] = useState<{"stop": () => void}>();

	const [ player, playerX, playerY ] = usePlayer({id: 0, x: PLAYER_OFFSET, y: 250, size: PLAYER_SIZE});
	const groundPlatform = useGround({ playerX, renderingDistance: 500 });
	const gameObjects: GameObject[] = [player];
	const [ score, setScore ] = useState(0);
	const [ gameOver, setGameOver ] = useState(false);

	useEffect(() => {
		const gameLoop = startGameLoop();
		setGameLoop(gameLoop);
		return () => gameLoop.stop();
	}, []);

	const startGameLoop = (): { "stop": () => void } => {
		const interval = setInterval(() => {
			frame_update([...gameObjects, ...groundPlatform], amplitude);
		}, 10);

		return { "stop": () => { clearInterval(interval) } };
	}

	useEffect(() => {
		if (playerY > height && gameLoop) {
			setGameOver(true);
			gameLoop.stop();
			router.replace({ pathname: "/gameover", params: { score } });
		}
	}, [playerY]);

	useEffect(() => {
		setScore(Math.floor((playerX - PLAYER_OFFSET) * SCORE_MULT));
	}, [playerX]);

	const style = StyleSheet.create({
		background: {
			backgroundColor: "black",
			width,
			height
		},
		score: {
			fontSize: 30,
			position: "absolute",
			color: "white"
		},
		gameOverOverlay: {
			backgroundColor: "black",
			width,
			height
		},
		scoreGameOver: {
			fontSize: 50,
			position: "absolute",
			color: "white"
		},
		display: {
			display: "flex",
			top: 100,
			bottom: 100
		}
	});

	return (
		<View style={style.background}>
			{<Text style={style.score}>Score: {score}</Text>}
			<PlayerComponent x={playerX} y={playerY} size={player.size} />
			{
				groundPlatform.filter((obj) => obj instanceof Wall).map((wall) => {
					return <WallComponent key={wall.id} x={wall.x} y={wall.y} wallWidth={wall.width} wallHeight={wall.height} playerX={playerX}/>;
				})
			}
		</View>
	);
	
}
