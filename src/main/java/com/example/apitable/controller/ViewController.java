package com.example.apitable.controller;

import com.example.apitable.exception.CustomException;
import com.example.apitable.service.EmployeeService;
import com.example.apitable.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class ViewController {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    ProjectService projectService;
    @GetMapping({"/","/index"})
    public String index(Model model) throws CustomException {
        model.addAttribute("totalEmployee", employeeService.getEmployeeCount());
        model.addAttribute("totalProject", projectService.getProjectCount());
        return "index";
    }
}
