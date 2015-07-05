package com.example.business;

import com.example.model.User;
import junit.framework.TestCase;

/**
 * Created by wjx on 15/7/5.
 */
public class UserServiceTest extends TestCase {

    public void testGetUser() throws Exception {
        UserService userService = new UserService();
        User user = userService.getUser();

        assertNotNull(user);
        assertEquals("Test", user.getName());
    }
}