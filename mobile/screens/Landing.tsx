import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tortuga from "../assets/images/tortuga.png";
import { Colors } from "../constants/Colors";
import { FontNames } from "../constants/Fonts";
import { Header, Paragraph } from "../constants/Text";
import { Card } from "../constants/Views";
import { useAuthState } from "../hooks/AuthContext";
import API, { League } from "../requests/api";
import { RootStackParamList } from "./Navigation";

const ProfileHeader: FC = () => {
  const { player } = useAuthState();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        height: 150,
        paddingTop: insets.top,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.accentGreen,
        flex: 0,
        alignItems: "center",
        paddingLeft: 50,
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: player?.picture }}
        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 20 }}
      />
      <View style={{ flex: 0, alignItems: "flex-start" }}>
        <Header
          style={{
            fontFamily: FontNames.MontserratSemibold,
            fontSize: 28,
            fontWeight: "600",
          }}
        >
          Hi, {player?.firstName}
        </Header>
        <Paragraph
          style={{ fontFamily: FontNames.MontserratRegular, fontSize: 17 }}
        >
          Welcome back!
        </Paragraph>
      </View>
    </View>
  );
};

export default function LandingScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">) {
  const { player } = useAuthState();
  const [leagues, setLeagues] = useState<League[]>([]);
  useEffect(() => {
    API.fetchPlayerLeagues(player!.playerId).then((leagues) =>
      setLeagues(leagues)
    );
  }, [player?.playerId]);

  return (
    <View>
      <ProfileHeader />

      <View style={{ margin: 20 }}>
        <Card style={{ alignItems: "center" }}>
          <Header style={{ marginBottom: 10 }}>
            Game of the Week: Tortuga
          </Header>
          <Image source={Tortuga} style={{ width: 300, height: 150 }} />
        </Card>

        <View style={{ alignItems: "center", margin: 15 }}>
          <Header>Your Leagues</Header>
        </View>
        {leagues.map((league) => (
          <TouchableOpacity
            key={league.leagueId}
            onPress={() => navigation.navigate("League", { league })}
          >
            <Card style={{ alignItems: "center" }}>
              <Header>{league.name}</Header>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
