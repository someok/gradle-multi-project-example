package com.example.web;

import com.example.business.UserService;
import com.example.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wjx on 15/7/5.
 */
@Controller
public class UserController {

    @RequestMapping("/user")
    public String getUser(Model model) {
        UserService userService = new UserService();
        User user = userService.getUser();

        model.addAttribute("user", user);
        return "user";
    }
}
