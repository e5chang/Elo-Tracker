import { Player } from "../hooks/AuthContext";

export interface League {
    leagueId: string;
    name: string;
}

export interface Game {
    gameId: string;
    leagueId: string;
    name: string;
    picture?: string;
}

class API {
    constructor(
        private base = 'https://4b3d8f158f3f.ngrok.io'
    ) {}

    async updatePlayerInformation(player: Player)  {
        const response = await fetch(`${this.base}/players/`, {
            method: 'PUT',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Bad player update');

        return await response.json() as Player
    }

    async fetchPlayerLeagues(playerId: string) {
        const resp = await fetch(`${this.base}/players/${playerId}/leagues`)
        return await resp.json() as League[];
    }

    async fetchLeagueGames(leagueId: string) {
        const resp = await fetch(`${this.base}/leagues/${leagueId}/games`);
        return await resp.json() as Game[];
    }

    async fetchLeaguePlayers(leagueId: string) {
        const resp = await fetch(`${this.base}/leagues/${leagueId}/players`);
        return await resp.json() as Player[];
    }
}

export default new API();