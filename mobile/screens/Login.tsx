import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import React, { useEffect } from "react";
import { Alert, Button, Image, Platform, View } from "react-native";
import WelcomeImage from "../assets/images/welcome.png";
import { Header, Paragraph } from "../constants/Text";
import { CenterFlex } from "../constants/Views";
import { useAuthDispatch } from "../hooks/AuthContext";

const redirectUri = makeRedirectUri();
console.log(redirectUri)

const clientId = 'JgaseMovdYx6osPlTa7twtpPSBmMayXO';
const authorizationEndpoint = 'https://leadrboard.us.auth0.com/authorize'

export default function LandingPage() {
  const authDispatch = useAuthDispatch();
  const [request, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId,
      responseType: "id_token",
      scopes: ["openid", "profile"],
      // TODO: Generate random nonce
      extraParams: { nonce: 'nonce' }
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    if (!result) return;
    if (result.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
    }
    
    if (result.type === 'success') {
      const idToken = result.params?.id_token;
      if (!idToken) {
        Alert.alert('Authentication error', 'Something went wrong, please try again.')
        return;
      }

      authDispatch({ type: 'login', idToken });
    }
  }, [result])

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

      <Button title="Login / Sign Up" onPress={() => promptAsync()}/>
    </CenterFlex>
  );
}
