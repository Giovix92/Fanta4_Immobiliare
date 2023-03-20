package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Immobile;

import java.util.List;

public interface ImmobileDao {
    List<Immobile> findAll(); //restituisce una lista di tutti gli annunci

    Immobile findByPrimaryKey(Long id); //restituisce un annuncio data la chiave primaria

    boolean saveOrUpdate(Immobile immobile); //salva se non esiste o aggiorna se esiste

    void delete(Immobile immobile);//cancella un immobile


}
