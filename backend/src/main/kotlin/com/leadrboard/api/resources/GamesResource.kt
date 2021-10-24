package com.leadrboard.api.resources

import com.leadrboard.api.data.Game
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/games")
class GamesResource {

    @PutMapping("/")
    fun createNewGame(@RequestBody game: Game): Void = TODO()

    @PutMapping("/{gameId}")
    fun getGame(@PathVariable gameId: String): Void = TODO()

}