package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.model.Aste;
import com.fanta4.immobiliare.service.AsteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200") //utile per frontend in quanto Angular usa la porta 4200
@RequestMapping("/api/aste") //tutti i metodi avranno nell'URL questa path come path principale
@RequiredArgsConstructor //crea in automatico un'istanza di AsteService
public class AsteController {
    private final AsteService a;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAste(@RequestBody Aste aste){
        a.createAste(aste);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Aste> findByID(@PathVariable Integer id){
        return a.getByID(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteAste(@PathVariable Integer id){
        return a.deleteByID(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Aste> updateAste(@PathVariable Integer id, @RequestBody Aste aste){
        return a.updateAste(id, aste);
    }
}