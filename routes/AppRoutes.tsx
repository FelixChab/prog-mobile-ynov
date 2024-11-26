import * as React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../components/Auth';
import Game from '../components/GameScreen';
import Leaderboard from '../components/Leaderboard';

// Navigation
const { Navigator, Screen, Group } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Screen name="Auth" component={Auth} options={{ headerShown: false }}/>
      <Group>
        <Screen name="Game" component={Game} options={{ headerShown: false }}/>
        <Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }}/>
      </Group>
    </Navigator>
  )
}