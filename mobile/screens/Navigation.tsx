import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useAuthState } from "../hooks/AuthContext";
import { Game, League } from '../requests/api';
import GameReportScreen from './GameReport';
import LandingScreen from './Landing';
import LeagueScreen from './League';
import LobbyScreen from './Lobby';
import LoginScreen from './Login';

export type RootStackParamList = {
    Landing: undefined;
    League: { league: League };
    Lobby: { game: Game; league: League };
    GameReport: { game: Game; };
  };

export default function Navigation() {
    const auth = useAuthState();

    const Stack = createNativeStackNavigator();

    let Content: JSX.Element;
    if (!auth.player) {
        Content = <LoginScreen />
    } else {
        Content = (
            <Stack.Navigator screenOptions={{ header: () => null }}>
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="League" component={LeagueScreen} />
                <Stack.Screen name="Lobby" component={LobbyScreen} />
                <Stack.Screen name="GameReport" component={GameReportScreen} />
            </Stack.Navigator>
        )
    }

    return (
        <SafeAreaProvider style={{
            backgroundColor: auth.player ? Colors.lightGrey : Colors.white,
        }}>
            {Content}
        </SafeAreaProvider>
    )
    
}