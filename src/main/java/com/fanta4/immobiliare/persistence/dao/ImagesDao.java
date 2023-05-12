package com.fanta4.immobiliare.persistence.dao;

import com.fanta4.immobiliare.persistence.model.Images;

import java.util.List;

public interface ImagesDao {
    List<Images> findAll();

    Images findByPrimaryKey(Integer id);

    List<Images> findByImmobileID(Integer id);

    boolean save(Images image);

    void delete(Images image);
}
