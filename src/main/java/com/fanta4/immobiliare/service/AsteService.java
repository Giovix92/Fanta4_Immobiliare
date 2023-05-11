package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Aste;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AsteService {

    public void createAste(Aste aste) {
        // TODO: 19/03/23 da inserire i controlli sugli input (aste)
        DBManager.getInstance().getAsteDAO().saveOrUpdate(aste);
    }

    public ResponseEntity<Aste> getByID(Integer id) {
        Aste aste = DBManager.getInstance().getAsteDAO().findByPrimaryKey(id);
        if(aste == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(aste); //genera un entità di risposta positiva
        // TODO: 19/03/23 controllo da fare: controllo sulla validità dell'ID 
    }

    public ResponseEntity<Object> deleteByID(Integer id) {
        Aste aste = DBManager.getInstance().getAsteDAO().findByPrimaryKey(id);
        if(aste == null)
            return ResponseEntity.notFound().build();
        DBManager.getInstance().getAsteDAO().delete(aste);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Aste> getAstabyImmobileID(Integer id) {
        Aste aste = DBManager.getInstance().getAsteDAO().findByImmobile(id);
        if(aste == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(aste);
    }

    public ResponseEntity<Aste> updateAste(Integer id, Aste aste) {
        Aste aste1 = DBManager.getInstance().getAsteDAO().findByPrimaryKey(id);
        if(aste == null)
            return ResponseEntity.notFound().build();
        else{
            // TODO: 19/03/23 controllare gli input (aste)
            aste1.setImmobile(aste.getImmobile());
            aste1.setAcquirente(aste.getAcquirente());
            aste1.setPrezzo_partenza(aste.getPrezzo_partenza());
            aste1.setPrezzo_corrente(aste.getPrezzo_corrente());
            aste1.setFine(aste.getFine());
            if(DBManager.getInstance().getAsteDAO().saveOrUpdate(aste1))
                return ResponseEntity.ok(aste1);
            else return ResponseEntity.internalServerError().build();
        }
    }
}
