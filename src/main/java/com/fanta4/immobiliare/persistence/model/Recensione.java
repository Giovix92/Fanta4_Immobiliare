package com.fanta4.immobiliare.persistence.model;

public class Recensione {

    private Long id;

    private String titolo;

    private Short rating;

    private String autore;

    private Long immobile;

    public Recensione(Long id, String titolo, Short rating, String autore, Long immobile) {
        this.id = id;
        this.titolo = titolo;
        this.rating = rating;
        this.autore = autore;
        this.immobile = immobile;
    }

    public Recensione() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Long getImmobile() {
        return immobile;
    }

    public void setImmobile(Long immobile) {
        this.immobile = immobile;
    }
}
