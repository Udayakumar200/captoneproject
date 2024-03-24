package com.project.project.controller;

import com.project.project.dto.UserRegisteredDTO;
import com.project.project.services.DefaultUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@Controller
@RequestMapping("/registration")

public class RegistrationController {
    private DefaultUserService userService;

    public RegistrationController(DefaultUserService userService) {
        super();
        this.userService = userService;
    }

    @ModelAttribute("user")
    public UserRegisteredDTO userRegistrationDto() {
        return new UserRegisteredDTO();
    }

    @GetMapping
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping
    public String registerUserAccount(@ModelAttribute("user")
                                      UserRegisteredDTO registrationDto) {
        userService.save(registrationDto);
        return "redirect:/login";
    }
}
