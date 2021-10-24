package com.leadrboard.api.dao

import com.leadrboard.api.data.League
import com.leadrboard.api.mappers.LeagueMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
class LeagueDao {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    fun getAllLeagues(): List<League> = jdbcTemplate.query("""
            SELECT *
            FROM leagues
        """.trimIndent(),
        LeagueMapper(),
    )

    fun getAllLeaguesForUser(userId: UUID): List<League> = jdbcTemplate.query(
        """
            SELECT *
            FROM leagues l
            WHERE l.league_id IN (
                SELECT league_id
                FROM players
                WHERE player.player_id = ?
            ) 
        """.trimIndent(),
        LeagueMapper(),
        userId,
    )

    fun createNewLeague(league: League) = jdbcTemplate.update(
        """
            INSERT INTO leagues (league_id, name)
            VALUES (?, ?)
        """.trimIndent(),
        league.leagueId,
        league.name,
    )
}