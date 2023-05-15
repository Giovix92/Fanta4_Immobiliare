package com.fanta4.immobiliare.persistence.model;

public class Images {
    private Integer id;
    private Integer immobile;
    private String img;

    public Images(Integer id, Integer immobile, String img) {
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
