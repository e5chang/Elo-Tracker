package com.leadrboard.api.dao

import com.leadrboard.api.data.Player
import com.leadrboard.api.mappers.PlayerMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.queryForObject
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Repository
class PlayerDao {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    fun getPlayer(playerId: UUID): Player? = jdbcTemplate.queryForObject(
        """
            SELECT *
            FROM players
            WHERE player_id = ?
        """.trimIndent(),
        PlayerMapper(),
        playerId,
    )

    @Transactional
    fun getPlayerByExternalId(externalId: String): Player? = try {
        jdbcTemplate.queryForObject(
            """
            SELECT *
            FROM players
            WHERE external_id = ?
        """.trimIndent(),
            PlayerMapper(),
            externalId,
        )
    } catch (e: EmptyResultDataAccessException) {
        null
    }

    @Transactional
    fun getPlayersInLeague(leagueId: UUID): List<Player> = jdbcTemplate.query(
        """
            SELECT *
            FROM players
            WHERE player_id IN (
                SELECT player_id
                FROM league_players
                WHERE league_id = ?
            )
        """.trimIndent(),
        PlayerMapper(),
        leagueId,
    )

    @Transactional
    fun savePlayer(player: Player) = jdbcTemplate.update("""
        INSERT INTO players (player_id, first_name, last_name, external_id, picture)
        VALUES (?, ?, ?, ?, ?)
    """.trimIndent(),
        player.playerId,
        player.firstName,
        player.lastName,
        player.externalId,
        player.picture,
    )

}