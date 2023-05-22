package com.fanta4.immobiliare.persistence.model;

public class Utente {
    private String id;

    private String nome;

    private String cognome;

    private String email;

    private Long telefono;

    private String tipologia;

    private String password;

    private Boolean bannato;

    public Utente(String id, String nome, String cognome, String email, Long telefono, String tipologia, String password, Boolean bannato) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.telefono = telefono;
        this.tipologia = tipologia;
        this.password = password;
        this.bannato = bannato;
    }

    public Utente() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getBannato() {
        return bannato;
    }

    public void setBannato(Boolean bannato) {
        this.bannato = bannato;
    }
}
