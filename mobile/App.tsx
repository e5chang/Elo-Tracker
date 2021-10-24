import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Fonts } from "./constants/Fonts";
import LandingPage from "./screens/Landing";

export default function App() {
  const [ready] = useFonts(Fonts)
  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LandingPage />
    </SafeAreaProvider>
  );
}
