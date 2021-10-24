import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GameForm } from "../components/forms/GameForm";
import { Player } from "../hooks/AuthContext";
import API from "../requests/api";
import { RootStackParamList } from "./Navigation";

export default function GameReportScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "GameReport">) {
  const game = route.params.game;

  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    API.fetchLeaguePlayers(game.leagueId).then((players) =>
      setPlayers(players)
    );
  }, [game.leagueId]);

  if (!players.length) return null;
  return (
    <View>
      <GameForm
        players={players}
        onSubmit={(formData) => console.log(formData)}
      />
    </View>
  );
}
