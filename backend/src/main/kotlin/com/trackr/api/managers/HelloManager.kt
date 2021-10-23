package com.trackr.api.managers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloManager {

    @GetMapping("/hello")
    fun sayHello(): String {
        return "Hello World"
    }

}