import * as React from 'react-native';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import Auth from '@/components/Auth';
import Game from '@/components/Game';


export default function MainApp(isAuthenticated: boolean) {

  const test = useAuth();
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      {isAuthenticated ? (
        <Game></Game>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={Auth}
          />
        </Stack.Navigator>
      )}
    </AuthProvider>
  )
}

// Styles CSS
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
