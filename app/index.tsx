import * as React from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function MainApp(isAuthenticated: boolean) {

  //const user = useAuth();
  const Stack = createNativeStackNavigator()

  return (
    <View>
      test
    </View>
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
