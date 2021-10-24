import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./constants/Colors";
import { Fonts } from "./constants/Fonts";
import { UserProvider } from "./hooks/AuthContext";
import Navigation from "./screens/Navigation";
import Onboarding from "./screens/Onboarding";

export default function App() {
  const [ready] = useFonts(Fonts)
  if (!ready) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
        <StatusBar style="dark" />
      </NavigationContainer>
    </UserProvider>
  );
}
