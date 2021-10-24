package com.leadrboard.api.dao

import com.leadrboard.api.data.Player
import com.leadrboard.api.mappers.PlayerMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
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

    fun savePlayer(player: Player) = jdbcTemplate.update("""
        INSERT INTO players (player_id, first_name, last_name)
        VALUES (?, ?, ?)
    """.trimIndent(),
        player.playerId,
        player.firstName,
        player.lastName,
    )

}