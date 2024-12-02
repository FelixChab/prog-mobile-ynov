import { StyleSheet, useWindowDimensions, View, Text, Alert } from "react-native";
import { frame_update } from "@/engine/logics";
import { useEffect, useState } from "react";
import SoundLevel from "react-native-sound-level";
import { GameObject } from "@/engine/game-objects/game_object";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerComponent from "./PlayerComponent";
import WallComponent from "./WallComponent";
import { LASER_STARTING_X, PLAYER_OFFSET, PLAYER_SIZE, SCORE_MULT } from "@/constants/game";
import { Wall } from "@/engine/game-objects/wall";
import { useGround } from "@/hooks/useGround";
import { AudioModule } from "expo-audio";
import { router } from "expo-router";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/useFirebase";
import { useLaser } from "@/hooks/useLaser";
import LaserComponent from "./LaserComponent";
import { useAuth } from "../AuthProvider";


export default function GameComponent() {
  const { user } = useAuth();

  // sound capture managment
  let amplitude = -100

  useEffect(() => {
    ;(async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync()
      if (permission.granted) {
        SoundLevel.start()
        SoundLevel.onNewFrame = (data) => {
          amplitude = data.value
        }
      }
    })()

    return () => SoundLevel.stop()
  }, [])

  // game managment
  const { width, height } = useWindowDimensions()
  const [gameLoop, setGameLoop] = useState<{ stop: () => void }>()

  const [player, playerX, playerY] = usePlayer({
    id: 0,
    x: PLAYER_OFFSET,
    y: 250,
    size: PLAYER_SIZE,
  })
  const [laser, laserX] = useLaser({ id: 0, x: LASER_STARTING_X })
  const groundPlatform = useGround({ playerX, renderingDistance: 500 })
  const gameObjects: GameObject[] = [player, laser]
  const [score, setScore] = useState(0)

  useEffect(() => {
    const gameLoop = startGameLoop()
    setGameLoop(gameLoop)
    return () => gameLoop.stop()
  }, [])

  const startGameLoop = (): { stop: () => void } => {
    const interval = setInterval(() => {
      frame_update([...gameObjects, ...groundPlatform], amplitude)
    }, 10)

    return {
      stop: () => {
        clearInterval(interval)
      },
    }
  }

  // game over managment
  useEffect(() => {
    if (playerY > height || laser.getRight() > player.getLeft()) {
      if (gameLoop) gameLoop.stop();
      if (user) updateHighScore(user, score);
      router.replace({ pathname: "/gameover", params: { score } });
    }
  }, [laserX]);

  useEffect(() => {
    setScore(Math.floor((playerX - PLAYER_OFFSET) * SCORE_MULT));
  }, [playerX]);

  // best score managment
  const updateHighScore = async (username: string, newScore: number) => {
    try {
      const dbUsers = collection(db, "Users")
      const q = query(dbUsers, where("username", "==", username.toLowerCase()));
      const doc = await getDocs(q)

      if (!doc.empty) {
        const userDoc = doc.docs[0]; // index 0 is the result returned by the previous query
        const userData = userDoc.data();
        if (newScore > (userData.highestScore)) {
          await updateDoc(userDoc.ref, {
            highestScore: newScore
          });
          Alert.alert("Nouveau record ! Score mis à jour.");
        }
      }
    } catch (error) {
      Alert.alert("Erreur: " + error);
    }
  }

  // Style CSS
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

  // Rendu composants
  return (
    <View style={style.background}>
      {<Text style={style.score}>Score: {score}</Text>}
      <PlayerComponent x={playerX} y={playerY} size={player.size} />
      {groundPlatform
        .filter((obj) => obj instanceof Wall)
        .map((wall) => {
          return (
            <WallComponent
              key={wall.id}
              x={wall.x}
              y={wall.y}
              wallWidth={wall.width}
              wallHeight={wall.height}
              playerX={playerX}
            />
          )
        })}
      <LaserComponent x={laserX} playerX={playerX} />
    </View>
  )
}
