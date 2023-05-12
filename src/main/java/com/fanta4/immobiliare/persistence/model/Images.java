package com.fanta4.immobiliare.persistence.model;

import java.sql.Blob;

public class Images {
    private Integer id;
    private Integer immobile;
    private Blob img;

    public Images(Integer id, Integer immobile, Blob img) {
        this.id = id;
        this.immobile = immobile;
        this.img = img;
    }

    public Images() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getImmobile() {
        return immobile;
    }

    public void setImmobile(Integer immobile) {
        this.immobile = immobile;
    }

    public Blob getImg() {
        return img;
    }

    public void setImg(Blob img) {
        this.img = img;
    }
}
