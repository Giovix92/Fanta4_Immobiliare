package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Recensione;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RecensioneService {

    public void createRecensione(Recensione recensione){
        // TODO: 21/03/23 da inserire i controlli sugli input (recensione)
        DBManager.getInstance().getRecensioneDAO().saveOrUpdate(recensione);
    }

    public ResponseEntity<Recensione> getByID(Integer id){
        Recensione recensione = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if(recensione == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(recensione); //genera un entità di risposta positiva
        // TODO: 19/03/23 controllo da fare: controllo sulla validità dell'ID
    }

    public ResponseEntity<Object> deleteByID(Integer id){
        Recensione recensione = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if (recensione == null)
            return ResponseEntity.notFound().build();
        DBManager.getInstance().getRecensioneDAO().delete(recensione);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Recensione> updateRecensione(Integer id, Recensione recensione){
        Recensione recensione1 = DBManager.getInstance().getRecensioneDAO().findByPrimaryKey(id);
        if(recensione == null)
            return ResponseEntity.notFound().build();
        else{
            // TODO: 19/03/23 controllare gli input (recensione)
            recensione1.setTitolo(recensione.getTitolo());
            recensione1.setRating(recensione.getRating());
            recensione1.setAutore(recensione.getAutore());
            recensione1.setImmobile(recensione.getImmobile());
            if(DBManager.getInstance().getRecensioneDAO().saveOrUpdate(recensione1))
                return ResponseEntity.ok(recensione1);
            else return ResponseEntity.internalServerError().build();

        }
    }




}
