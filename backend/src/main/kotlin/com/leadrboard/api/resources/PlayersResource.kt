package com.leadrboard.api.resources

import com.leadrboard.api.dao.LeagueDao
import com.leadrboard.api.dao.PlayerDao
import com.leadrboard.api.data.League
import com.leadrboard.api.data.Match
import com.leadrboard.api.data.Player
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/users")
class PlayersResource {

    @Autowired
    lateinit var leagueDao: LeagueDao

    @Autowired
    lateinit var playerDao: PlayerDao

    @PutMapping("/")
    fun registerNewPlayer(@RequestBody player: Player) {
        playerDao.savePlayer(player)
    }

    @GetMapping("/{userId}/leagues")
    fun getPlayerLeagues(@PathVariable userId: UUID): List<League> {
        return leagueDao.getAllLeaguesForUser(userId)
    }

    @GetMapping("/{userId}/history")
    fun getPlayerMatchHistory(@PathVariable userId: UUID): List<Match> = TODO()

}