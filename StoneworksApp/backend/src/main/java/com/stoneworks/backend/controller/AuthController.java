package com.stoneworks.backend.controller;

import com.stoneworks.backend.entity.User;
import com.stoneworks.backend.service.UserService;
import com.stoneworks.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Adjust according to your frontend URL
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        String response = userService.login(user.getEmail(), user.getPassword());
        if (response.startsWith("redirect:")) {
            UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
            final String token = jwtUtil.generateToken(userDetails);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("userType", userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")) ? "admin" : "user");
            return ResponseEntity.ok(responseBody);
        } else if ("Email lub hasło zostały źle wprowadzone".equals(response)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String response = userService.register(user);
        if ("Rejestracja zakończona pomyślnie".equals(response)) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
