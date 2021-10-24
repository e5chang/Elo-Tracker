import React from "react";
import WelcomeImage from "../assets/images/welcome.png";
import { View, Image, Alert } from "react-native";
import { Header, Paragraph } from "../constants/Text";
import { LoginForm } from "../components/forms/LoginForm";

export default function LandingPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 48 }}>
      <Image source={WelcomeImage} style={{ width: 300, height: 300 }} />

      <Header>Welcome Back!</Header>
      <Paragraph>Hi, Kindly login to view the competition</Paragraph>

      <LoginForm onSubmit={form => Alert.alert(JSON.stringify(form))} />
    </View>
  );
}
