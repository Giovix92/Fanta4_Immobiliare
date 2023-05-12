package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Utente;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UtenteService {
    public void createUtente(Utente utente) {
        // TODO: Inserire i controlli sugli input
        DBManager.getInstance().getUtenteDAO().saveOrUpdate(utente);
    }

    public ResponseEntity<Utente> getByID(String cf) {
        Utente utente = DBManager.getInstance().getUtenteDAO().findByPrimaryKey(cf);
        if (utente == null) return ResponseEntity.notFound().build(); // 404 page
        // TODO: Controllo sulla validità dell'ID (codice fiscale)
        return ResponseEntity.ok(utente); // Genera un entità di risposta positiva
    }

    public ResponseEntity<Utente> getByEmail(String email) {
        Utente utente = DBManager.getInstance().getUtenteDAO().findByEmail(email);
        if (utente == null) return ResponseEntity.notFound().build(); // 404 page
        // TODO: Controllo sulla validità dell'ID (codice fiscale)
        return ResponseEntity.ok(utente); // Genera un entità di risposta positiva
    }

    public ResponseEntity<Object> deleteByID(String cf) {
        Utente utente = DBManager.getInstance().getUtenteDAO().findByPrimaryKey(cf);
        if (utente == null) return ResponseEntity.notFound().build();
        DBManager.getInstance().getUtenteDAO().delete(utente);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Utente> updateUtente(String cf, Utente utente) {
        Utente utente1 = DBManager.getInstance().getUtenteDAO().findByPrimaryKey(cf);
        if (utente == null) return ResponseEntity.notFound().build();
        else {
            // TODO: Inserire i controlli sugli input
            utente1.setNome(utente.getNome());
            utente1.setCognome(utente.getCognome());
            utente1.setEmail(utente.getEmail());
            utente1.setTelefono(utente.getTelefono());
            utente1.setTipologia(utente.getTipologia());
            utente1.setPassword(utente.getPassword());
            if(DBManager.getInstance().getUtenteDAO().saveOrUpdate(utente1))
                return ResponseEntity.ok(utente1);
            else return ResponseEntity.internalServerError().build();
        }
    }
}
