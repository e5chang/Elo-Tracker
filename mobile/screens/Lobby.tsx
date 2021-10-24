import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { Header } from "../constants/Text";
import { Card } from "../constants/Views";
import { RootStackParamList } from "./Navigation";

export default function LobbyScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Lobby">) {
  const { game, league } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginTop: insets.top, margin: 20 }}>
      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={() => navigation.navigate("GameReport", { game })}
      >
        <Text style={{ fontSize: 40, margin: 15 }}>+</Text>
      </TouchableOpacity>

      <Card style={{ alignItems: "center" }}>
        <Header style={{ color: Colors.accentGreen }}>
          {game.name} Leaderboard
        </Header>
        <Header>{league.name}</Header>
      </Card>
    </View>
  );
}
