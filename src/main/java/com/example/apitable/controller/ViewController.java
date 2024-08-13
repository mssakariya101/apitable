package com.example.apitable.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping({"/","/index"})
    public String index() {
        return "index";
    }
    @GetMapping("/employee/show")
    public String employee() {
        return "tables/employee-details";
    }

}
