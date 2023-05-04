package com.fanta4.immobiliare.controller.api;

import com.fanta4.immobiliare.persistence.model.Utente;
import com.fanta4.immobiliare.service.UtenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200") // Porta di angular
@RequestMapping("/api/utenti")
@RequiredArgsConstructor // Crea in automatico un'istanza di UtenteService
public class UtenteController {
    private final UtenteService i;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUtente(@RequestBody Utente utente) {
        i.createUtente(utente);
    }

    @GetMapping("/{string}")
    public ResponseEntity<Utente> findByID(@PathVariable String string) {
        if (string.contains("@")) return i.getByEmail(string);
        return i.getByID(string);
    }

    @DeleteMapping("/{cf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteUtente(@PathVariable String cf) {
        return i.deleteByID(cf);
    }

    @PutMapping("/{cf}")
    public ResponseEntity<Utente> updateUtente(@PathVariable String cf, @RequestBody Utente utente) {
        return i.updateUtente(cf, utente);
    }

}
