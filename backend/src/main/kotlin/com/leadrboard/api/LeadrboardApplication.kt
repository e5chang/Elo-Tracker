package com.leadrboard.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LeadrboardApplication

fun main(args: Array<String>) {
	runApplication<LeadrboardApplication>(*args)
}