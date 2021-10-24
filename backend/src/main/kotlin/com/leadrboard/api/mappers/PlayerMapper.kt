package com.leadrboard.api.mappers

import com.leadrboard.api.data.Player
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet
import java.util.*

class PlayerMapper : RowMapper<Player> {

    override fun mapRow(rs: ResultSet, rowNum: Int) = Player(
        playerId = UUID.fromString(rs.getString("player_id")),
        firstName = rs.getString("first_name"),
        lastName = rs.getString("last_name"),
        picture = rs.getString("picture"),
        externalId = rs.getString("external_id"),
    )

}