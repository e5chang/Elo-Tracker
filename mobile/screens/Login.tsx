import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import React, { useEffect } from "react";
import { Button, Image, Platform, View } from "react-native";
import WelcomeImage from "../assets/images/welcome.png";
import { Header, Paragraph } from "../constants/Text";
import { CenterFlex } from "../constants/Views";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });
const clientId = 'JgaseMovdYx6osPlTa7twtpPSBmMayXO';
const authorizationEndpoint = 'https://leadrboard.us.auth0.com/authorize'

export default function LandingPage() {
  const [request, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId,
      responseType: "id_token",
      scopes: ["openid", "profile"],
      extraParams: {
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // useEffect(() => {
  //   if (result?.type === 'success') {
  //     result.authentication.
  //   }
  // }, [result])

  return (
    <CenterFlex style={{ justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={WelcomeImage}
          style={{ width: 300, height: 300, marginBottom: 50 }}
        />
        <Header>Welcome Back!</Header>
        <Paragraph>Hi, kindly login to view the competition</Paragraph>
      </View>

      <Button title="Login" onPress={() => promptAsync()}/>
    </CenterFlex>
  );
}
