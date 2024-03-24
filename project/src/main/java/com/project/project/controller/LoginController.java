package com.project.project.controller;

import com.project.project.dto.UserLoginDTO;
import com.project.project.services.DefaultUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private DefaultUserService userService;
    @ModelAttribute("user")
    public UserLoginDTO userLoginDTO() {
        return new UserLoginDTO();
    }
@GetMapping
public String login() {
    return "login";
}
@PostMapping
public String loginUser(@ModelAttribute("user")
                       UserLoginDTO userLoginDTO) {
    userService.loadUserByUsername(userLoginDTO.getUsername());
    return "redirect:/dashboard";

}
}


