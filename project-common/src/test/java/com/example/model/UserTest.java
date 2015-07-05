package com.example.model;

import junit.framework.TestCase;
import org.junit.Test;

/**
 * Created by wjx on 15/7/5.
 */
public class UserTest extends TestCase {

    @Test
    public void test() {
        User user = new User();
        user.setName("test");

        assertNotNull(user);
        assertEquals("test", user.getName());
    }
}