import GameComponent from "@/components/game/GameComponent";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/useFirebase";

export default function App() {
    // Gestion du meilleur score
    const updateHighScore = async (userId: string, newScore: number) => {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, {
        highScore: newScore,
      });
    }
	return (
		<GameComponent />
	);
}
