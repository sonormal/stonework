package com.stoneworks.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stoneworks.backend.entity.Stone;
import com.stoneworks.backend.repository.StoneRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stones")
public class StoneController {

    @Autowired
    private StoneRepository stoneRepository;

    @GetMapping
    public List<Stone> getAllStones(@RequestParam(required = false) String rodzaj,
                                    @RequestParam(required = false) String kolor,
                                    @RequestParam(required = false) String cena) {
        if (rodzaj != null || kolor != null || cena != null) {
            return stoneRepository.findByTypeAndColorAndSort(rodzaj, kolor, cena);
        }
        return stoneRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stone> getStoneById(@PathVariable Long id) {
        Optional<Stone> stone = stoneRepository.findById(id);
        return stone.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Stone> createStone(@RequestBody Stone stone) {
        try {
            Stone savedStone = stoneRepository.save(stone);
            return new ResponseEntity<>(savedStone, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stone> updateStone(@PathVariable Long id, @RequestBody Stone stoneDetails) {
        Optional<Stone> stoneData = stoneRepository.findById(id);
        if (stoneData.isPresent()) {
            Stone updatedStone = stoneData.get();
            updatedStone.setName(stoneDetails.getName());
            updatedStone.setType(stoneDetails.getType());
            updatedStone.setColor(stoneDetails.getColor());
            updatedStone.setPrice(stoneDetails.getPrice());
            updatedStone.setPath(stoneDetails.getPath());
            stoneRepository.save(updatedStone);
            return new ResponseEntity<>(updatedStone, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStone(@PathVariable Long id) {
        try {
            stoneRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
