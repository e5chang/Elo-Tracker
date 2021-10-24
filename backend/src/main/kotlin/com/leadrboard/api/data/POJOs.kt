package com.leadrboard.api.data

import java.util.UUID

data class League(
    val leagueId: UUID = UUID.randomUUID(),
    val name: String,
)

data class Player(
    val playerId: UUID = UUID.randomUUID(),
    val firstName: String,
    val lastName: String,
    val picture: String?,
    val externalId: String?,
)

data class Match(
    val matchId: UUID = UUID.randomUUID(),
    val gameId: UUID,
)

data class Game(
    val gameId: UUID = UUID.randomUUID(),
    val leagueId: UUID,
    val name: String,
    val picture: String?,
)