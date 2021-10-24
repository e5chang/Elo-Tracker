import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Fonts } from "./constants/Fonts";
<<<<<<< HEAD
import { AuthContextProvider, initializeAuthContext } from "./hooks/AuthContext";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login"
=======
import { UserProvider } from "./hooks/AuthContext";
import Navigation from "./screens/Navigation";
>>>>>>> 844d71363205750c34766f0b9f447f7a73273b73

export default function App() {
  const [ready] = useFonts(Fonts)
  if (!ready) {
    return null;
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
<<<<<<< HEAD
        <Onboarding />
=======
        <Navigation />
>>>>>>> 844d71363205750c34766f0b9f447f7a73273b73
      </SafeAreaProvider>
    </UserProvider>
  );
}
