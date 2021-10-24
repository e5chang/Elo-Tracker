import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Fonts } from "./constants/Fonts";
import { UserProvider } from "./hooks/AuthContext";
import Navigation from "./screens/Navigation";

export default function App() {
  const [ready] = useFonts(Fonts)
  if (!ready) {
    return null;
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Navigation />
      </SafeAreaProvider>
    </UserProvider>
  );
}
