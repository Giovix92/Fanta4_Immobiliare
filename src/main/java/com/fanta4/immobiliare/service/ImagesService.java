package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Images;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagesService {
    public void createImage(Images image) {
        DBManager.getInstance().getImagesDAO().save(image);
    }

    public ResponseEntity<Images> getByID(Integer id) {
        Images image = DBManager.getInstance().getImagesDAO().findByPrimaryKey(id);
        if (image == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(image);
    }

    public ResponseEntity<List<Images>> getAllEntries() {
        List<Images> images = DBManager.getInstance().getImagesDAO().findAll();
        if(images == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(images);
    }

    public ResponseEntity<List<Images>> getImagesByImmobileID(Integer id) {
        List<Images> images = DBManager.getInstance().getImagesDAO().findByImmobileID(id);
        if(images == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(images);
    }

    public ResponseEntity<Object> deleteByID(Integer id) {
        Images image = DBManager.getInstance().getImagesDAO().findByPrimaryKey(id);
        if(image == null) return ResponseEntity.notFound().build();
        DBManager.getInstance().getImagesDAO().delete(image);
        return ResponseEntity.noContent().build();
    }
}
