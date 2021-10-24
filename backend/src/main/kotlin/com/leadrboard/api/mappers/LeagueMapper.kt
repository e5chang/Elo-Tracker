package com.leadrboard.api.mappers

import com.leadrboard.api.data.League
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet
import java.util.*

class LeagueMapper : RowMapper<League> {
    override fun mapRow(rs: ResultSet, rowNum: Int) = League(
        leagueId = UUID.fromString(rs.getString("league_id")),
        name = rs.getString("name"),
    )
}