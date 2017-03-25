package com.example.model;

import java.io.Serializable;

/**
 * Created by wjx on 15/7/5.
 */
public class User implements Serializable {

    private String name;

    private int age = 0;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {

        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
