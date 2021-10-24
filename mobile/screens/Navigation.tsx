import React from 'react';
import { Header } from '../constants/Text';
import { useAuthState } from "../hooks/AuthContext";
import LoginScreen from './Login';


export default function Navigation() {
    const auth = useAuthState();

    if (!auth.user) {
        return <LoginScreen />
    } else {
        return <Header>Logged In!</Header>;
    }
}