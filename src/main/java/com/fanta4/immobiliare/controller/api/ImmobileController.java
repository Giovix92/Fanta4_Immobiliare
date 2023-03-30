package com.fanta4.immobiliare.controller.api;

import com.fanta4.immobiliare.persistence.model.Immobile;
import com.fanta4.immobiliare.service.ImmobileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200") //utile per frontend in quanto Angular usa la porta 4200
@RequestMapping("/api/immobili") //tutti i metodi avranno nell'URL questa path come path principale
@RequiredArgsConstructor //crea in automatico un'istanza di ImmobileService
public class ImmobileController {
    private final ImmobileService i;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createImmobile(@RequestBody Immobile immobile){
        i.createImmobile(immobile);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Immobile> findByID(@PathVariable Integer id){
        return i.getByID(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteImmobile(@PathVariable Integer id){
        return i.deleteByID(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Immobile> updateImmobile(@PathVariable Integer id, @RequestBody Immobile immobile){
        return i.updateImmobile(id, immobile);
    }
}
