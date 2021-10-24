package com.leadrboard.api.mappers

import com.leadrboard.api.data.Game
import com.leadrboard.api.data.League
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet
import java.util.*

class GameMapper : RowMapper<Game> {
    override fun mapRow(rs: ResultSet, rowNum: Int) = Game(
        leagueId = UUID.fromString(rs.getString("league_id")),
        gameId = UUID.fromString(rs.getString("game_id")),
        name = rs.getString("name"),
        picture = rs.getString("picture"),
    )
}