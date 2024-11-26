import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, Text } from "react-native";
import { useSession } from "@/components/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) {
      SplashScreen.hideAsync();
    }
  }, [session]);

  if (!session) {
    return <Redirect href="/" />
  }

  // Redirection composants
  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    margin: 0,
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
