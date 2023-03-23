package com.fanta4.immobiliare.persistence.model;

public class Immobile {
    private Integer id;
    private String nome;
    private String tipo;
    private Double prezzo;
    private String descrizione;
    private Double metri_quadri;
    private String indirizzo;
    private String proprietario;
    private String tipo_annuncio;

    public Immobile(Integer id, String nome, String tipo, Double prezzo, String descrizione, Double metri_quadri, String indirizzo, String proprietario, String tipo_annuncio) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.prezzo = prezzo;
        this.descrizione = descrizione;
        this.metri_quadri = metri_quadri;
        this.indirizzo = indirizzo;
        this.proprietario = proprietario;
        this.tipo_annuncio = tipo_annuncio;
    }

    public Immobile() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Double getMetri_quadri() {
        return metri_quadri;
    }

    public void setMetri_quadri(Double metri_quadri) {
        this.metri_quadri = metri_quadri;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getProprietario() {
        return proprietario;
    }

    public void setProprietario(String proprietario) {
        this.proprietario = proprietario;
    }

    public String getTipo_annuncio() {
        return tipo_annuncio;
    }

    public void setTipo_annuncio(String tipo_annuncio) {
        this.tipo_annuncio = tipo_annuncio;
    }
}
