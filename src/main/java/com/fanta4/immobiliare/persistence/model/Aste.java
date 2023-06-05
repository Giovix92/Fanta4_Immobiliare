package com.fanta4.immobiliare.persistence.model;

public class Aste {

    private Integer id;

    private Integer immobile; //id dell'immobile messo in asta

    private String acquirente; //l'ultimo che ha fatto la proposta (ovviamente più alta di quella corrente)

    private Integer prezzo_partenza;

    private Integer prezzo_corrente; //sempre maggiore del prezzo di partenza

    private Long fine;

    public Aste(Integer id, Integer immobile, String acquirente, Integer prezzo_partenza, Integer prezzo_corrente, Long fine) {
        this.id = id;
        this.immobile = immobile;
        this.acquirente = acquirente;
        this.prezzo_partenza = prezzo_partenza;
        this.prezzo_corrente = prezzo_corrente;
        this.fine = fine;
    }

    public Aste() {}

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

    public String getAcquirente() {
        return acquirente;
    }

    public void setAcquirente(String acquirente) {
        this.acquirente = acquirente;
    }

    public Integer getPrezzo_partenza() {
        return prezzo_partenza;
    }

    public void setPrezzo_partenza(Integer prezzo_partenza) {
        this.prezzo_partenza = prezzo_partenza;
    }

    public Integer getPrezzo_corrente() {
        return prezzo_corrente;
    }

    public void setPrezzo_corrente(Integer prezzo_corrente) {
        this.prezzo_corrente = prezzo_corrente;
    }

    public Long getFine() {
        return fine;
    }

    public void setFine(Long fine) {
        this.fine = fine;
    }
}
