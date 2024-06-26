package com.stoneworks.backend.entity;

import jakarta.persistence.*;
// relacje nastepny pytanie
@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String message;

    private String stoneName;

    // Constructors
    public Contact() {
    }

    public Contact(Long id, Long userId, String email, String name, String surname, String phone, String message,
            String stoneName) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.message = message;
        this.stoneName = stoneName;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStoneName() {
        return stoneName;
    }

    public void setStoneName(String stoneName) {
        this.stoneName = stoneName;
    }
}
