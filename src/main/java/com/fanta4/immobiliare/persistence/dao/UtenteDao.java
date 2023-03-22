package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Utente;
import java.util.List;

public interface UtenteDao {
    List<Utente> findAll(); // Restituisce una lista di utenti

    Utente findByPrimaryKey(String cf); // Restituisce un utente dato il codice fiscale (id)

    boolean saveOrUpdate(Utente utente); // Salva un nuovo utente se non esiste, altrimenti lo aggiorna

    void delete(Utente utente); // Cancella un utente
}
