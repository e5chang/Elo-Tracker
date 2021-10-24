import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Alert, Button, Image } from "react-native";
import WelcomeImage from "../assets/images/welcome.png";
import { Header, Paragraph } from "../constants/Text";
import { CenterFlex } from "../constants/Views";
import { JWTToken, Player, useAuthDispatch } from "../hooks/AuthContext";
import API from "../requests/api";

const redirectUri = makeRedirectUri();
console.log(redirectUri);

const clientId = "JgaseMovdYx6osPlTa7twtpPSBmMayXO";
const authorizationEndpoint = "https://leadrboard.us.auth0.com/authorize";

export default function LandingPage() {
  const authDispatch = useAuthDispatch();
  const [request, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId,
      responseType: "id_token",
      scopes: ["openid", "profile"],
      // TODO: Generate random nonce
      extraParams: { nonce: "nonce" },
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    if (!result) return;
    if (result.type === "error") {
      Alert.alert(
        "Authentication error",
        result.params.error_description || "something went wrong"
      );
      return;
    }

    if (result.type === "success") {
      const idToken = result.params?.id_token;
      if (!idToken) {
        Alert.alert(
          "Authentication error",
          "Something went wrong, please try again."
        );
        return;
      }

      const decodedToken = jwtDecode(idToken) as JWTToken;
      const player: Player = {
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        picture: decodedToken.picture,
        externalId: decodedToken.sub,
      };

      async function updateServerUser() {
        const updatedPlayer = await API.updatePlayerInformation(player);
        authDispatch({ type: "login", player: updatedPlayer });
      }

      // TODO: Cache ID token / rehydrate on reloads
      updateServerUser();
    }
  }, [result]);

  return (
    <CenterFlex style={{ justifyContent: "center", paddingTop: 10 }}>
      <Image
        source={WelcomeImage}
        style={{ width: 300, height: 300, marginBottom: 50 }}
      />

      <Header>Welcome Back!</Header>
      <Paragraph>Hi, kindly login to view the competition</Paragraph>
      <Button title="Login / Sign Up" onPress={() => promptAsync()} />
    </CenterFlex>
  );
}
