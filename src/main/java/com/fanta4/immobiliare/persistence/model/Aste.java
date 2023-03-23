package com.fanta4.immobiliare.persistence.model;

import com.sun.jdi.IntegerValue;

import java.sql.Timestamp;

public class Aste {

    private Integer id;

    private Integer immobile; //id dell'immobile messo in asta

    private String proprietario;  //cf del venditore

    private String acquirente; //l'ultimo che ha fatto la proposta (ovviamente più alta di quella corrente)

    private Integer prezzo_partenza;

    private Integer prezzo_corrente; //sempre maggiore del prezzo di partenza

    private Timestamp partenza;

    private Timestamp fine;


}
