package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.model.Recensione;
import com.fanta4.immobiliare.service.RecensioneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Recensione> findByID(@PathVariable Long id) { return r.getByID(id); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteRecensione(@PathVariable Long id) { return r.deleteByID(id); }

    @PutMapping("/{id}")
    public ResponseEntity<Recensione> updateRecensione(@PathVariable Long id, Recensione recensione){
        return r.updateRecensione(id, recensione);
    }
}
