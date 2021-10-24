package com.leadrboard.api.dao

import com.leadrboard.api.data.Game
import com.leadrboard.api.data.League
import com.leadrboard.api.mappers.GameMapper
import com.leadrboard.api.mappers.LeagueMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
class GameDao {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    fun getAllGamesForLeague(leagueId: UUID): List<Game> = jdbcTemplate.query("""
            SELECT *
            FROM games
            WHERE league_id = ?
        """.trimIndent(),
        GameMapper(),
        leagueId,
    )

}