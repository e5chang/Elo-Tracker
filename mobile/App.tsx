import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Fonts } from "./constants/Fonts";
import { AuthContextProvider, initializeAuthContext } from "./hooks/AuthContext";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login"

export default function App() {
  const [ready] = useFonts(Fonts)
  if (!ready) {
    return null;
  }

  return (
    <AuthContextProvider value={initializeAuthContext()}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Onboarding />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}
