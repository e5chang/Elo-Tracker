import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
      <NavigationContainer>
        <Navigation />
        <StatusBar style="dark" />
      </NavigationContainer>
    </UserProvider>
  );
}
