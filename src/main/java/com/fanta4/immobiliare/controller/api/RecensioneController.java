package com.fanta4.immobiliare.controller.api;

import com.fanta4.immobiliare.persistence.model.Recensione;
import com.fanta4.immobiliare.service.RecensioneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/recensioni")
@RequiredArgsConstructor
public class RecensioneController {

    private final RecensioneService r;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createRecensione(@RequestBody Recensione recesione) { r.createRecensione(recesione); }

    @GetMapping("/{id}")
    public ResponseEntity<Recensione> findByID(@PathVariable Integer id) { return r.getByID(id); }

    @GetMapping("/findByImmobile/{immobileID}")
    public ResponseEntity<List<Recensione>> findAllByImmobile(@PathVariable Integer immobileID) { return r.getByImmobileID(immobileID); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteRecensione(@PathVariable Integer id) { return r.deleteByID(id); }

    @PutMapping("/{id}")
    public ResponseEntity<Recensione> updateRecensione(@PathVariable Integer id, Recensione recensione){
        return r.updateRecensione(id, recensione);
    }
}