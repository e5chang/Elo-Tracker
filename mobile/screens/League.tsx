import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { Header } from "../constants/Text";
import { Card } from "../constants/Views";
import { Game } from "../requests/api";
import { RootStackParamList } from "./Navigation";
import API from '../requests/api';

export default function LeagueScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "League">) {
  const league = route.params.league;
  const insets = useSafeAreaInsets();

  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    API.fetchLeagueGames(league.leagueId).then(games =>
        setGames(games)
    );
  }, [league.leagueId]);

  return (
    <View style={{ marginTop: insets.top, margin: 20 }}>
      <Card style={{ alignItems: "center" }}>
        <Header style={{ color: Colors.accentGreen }}>Games played</Header>
        <Header>in {league.name}</Header>
      </Card>

      {games.map(game => (
          <TouchableOpacity key={game.gameId} onPress={() => navigation.navigate('Lobby', { game, league })}>
            <Card style={{ alignItems: 'center', marginTop: 15 }}>
                {game.picture && (
                    <Image source={{ uri: game.picture }} style={{ width: 300, height: 150 }} />
                )}
                <Header>{game.name}</Header>
            </Card>
          </TouchableOpacity>
      ))}
    </View>
  );
}
