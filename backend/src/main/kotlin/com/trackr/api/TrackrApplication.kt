package com.trackr.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TrackrApplication

fun main(args: Array<String>) {
	runApplication<TrackrApplication>(*args)
}