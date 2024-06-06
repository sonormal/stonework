package com.stoneworks.backend.controller;

import com.stoneworks.backend.entity.Stone;
import com.stoneworks.backend.repository.StoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final StoneRepository stoneRepository;

    @Autowired
    public ProjectController(StoneRepository stoneRepository) {
        this.stoneRepository = stoneRepository;
    }

    @PostMapping(value = "/search", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<Stone>> search(@RequestBody Stone searchParams) {
        List<Stone> stones = stoneRepository.getStonesByFilters(searchParams.getType(), searchParams.getColor());
        return ResponseEntity.ok(stones);
    }
}
