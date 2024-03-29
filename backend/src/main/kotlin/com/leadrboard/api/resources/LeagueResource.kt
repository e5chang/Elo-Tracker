package com.leadrboard.api.resources

import com.leadrboard.api.dao.GameDao
import com.leadrboard.api.dao.LeagueDao
import com.leadrboard.api.dao.PlayerDao
import com.leadrboard.api.data.Game
import com.leadrboard.api.data.League
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
@RequestMapping("/leagues")
class LeagueResource {

    @Autowired
    lateinit var leagueDao: LeagueDao

    @Autowired
    lateinit var gameDao: GameDao

    @Autowired
    lateinit var playerDao: PlayerDao

    @GetMapping("/")
    fun getLeagues(): List<League> = leagueDao.getAllLeagues()

    @PutMapping("/")
    fun createLeague(@RequestBody league: League) = leagueDao.createNewLeague(league)

//    @GetMapping("/{leagueId}")
//    fun getLeague(@PathVariable leagueId: UUID): Game = TODO()

    @GetMapping("/{leagueId}/games")
    fun getLeagueGames(@PathVariable leagueId: UUID): List<Game> = gameDao.getAllGamesForLeague(leagueId)

    @GetMapping("/{leagueId}/players")
    fun getLeaguePlayers(@PathVariable leagueId: UUID): List<Player> = playerDao.getPlayersInLeague(leagueId)

}