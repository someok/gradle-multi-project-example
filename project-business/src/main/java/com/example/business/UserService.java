package com.example.business;

import com.example.model.User;
import org.springframework.stereotype.Service;

/**
 * Created by wjx on 15/7/5.
 */
@Service
public class UserService {

    public User getUser() {
        User user = new User();
        user.setName("Test");

        return user;
    }
}
