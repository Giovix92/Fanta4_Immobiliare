package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Aste;

import java.util.List;

public interface AsteDao {
    List<Aste> findAll();

    Aste findByPrimaryKey(Integer id);

    boolean saveOrUpdate(Aste aste);

    void delete(Aste aste);
}
