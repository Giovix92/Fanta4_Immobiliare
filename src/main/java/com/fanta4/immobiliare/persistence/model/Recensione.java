package com.fanta4.immobiliare.persistence.model;

public class Recensione {

    private Integer id;

    private String titolo;

    private Short rating;

    private String autore;

    private Integer immobile;

    public Recensione(Integer id, String titolo, Short rating, String autore, Integer immobile) {
        this.id = id;
        this.titolo = titolo;
        this.rating = rating;
        this.autore = autore;
        this.immobile = immobile;
    }

    public Recensione() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public Short getRating() {
        return rating;
    }

    public void setRating(Short rating) {
        this.rating = rating;
    }

    public String getAutore() {
        return autore;
    }

    public void setAutore(String autore) {
        this.autore = autore;
    }

    public Integer getImmobile() {
        return immobile;
    }

    public void setImmobile(Integer immobile) {
        this.immobile = immobile;
    }
}
