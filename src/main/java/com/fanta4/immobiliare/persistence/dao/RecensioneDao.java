package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Recensione;

import java.util.List;

public interface RecensioneDao {
    List<Recensione> findAll(); //restituisce una lista di tutti gli annunci

    Recensione findByPrimaryKey(Long id); //restituisce un annuncio data la chiave primaria

    boolean saveOrUpdate(Recensione recensione); //salva se non esiste o aggiorna se esiste

    void delete(Recensione recensione);//cancella un immobile

}
