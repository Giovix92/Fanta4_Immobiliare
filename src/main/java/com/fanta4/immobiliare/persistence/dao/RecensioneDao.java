package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Recensione;

import java.util.List;

public interface RecensioneDao {
    List<Recensione> findAll(); //restituisce una lista di tutti gli annunci

    Recensione findByPrimaryKey(Integer id); //restituisce un annuncio data la chiave primaria

    List<Recensione> findByImmobile(Integer immobileId); // Restituisce tutte le recensioni dato l'ID dell'immobile

    boolean saveOrUpdate(Recensione recensione); //salva se non esiste o aggiorna se esiste

    void delete(Recensione recensione);//cancella un immobile

}
