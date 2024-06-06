package com.stoneworks.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stones")
public class Stone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String color;
    private double price;
    private String path; // ścieżka do obrazka

    // Constructors
    public Stone() {
    }

    public Stone(Long id, String name, String type, String color, double price, String path) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.price = price;
        this.path = path;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
