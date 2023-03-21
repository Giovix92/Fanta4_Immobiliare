package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Immobile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ImmobileService {

    public void createImmobile(Immobile immobile) {
        // TODO: 19/03/23 da inserire i controlli sugli input (immobile)
        DBManager.getInstance().getImmobileDAO().saveOrUpdate(immobile);
    }

    public ResponseEntity<Immobile> getByID(Long id) {
        Immobile immobile = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if(immobile == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(immobile); //genera un entità di risposta positiva
        // TODO: 19/03/23 controllo da fare: controllo sulla validità dell'ID 
    }

    public ResponseEntity<Object> deleteByID(Long id) {
        Immobile immobile = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if(immobile == null)
            return ResponseEntity.notFound().build();
        DBManager.getInstance().getImmobileDAO().delete(immobile);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Immobile> updateImmobile(Long id, Immobile immobile) {
        Immobile immobile1 = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if(immobile == null)
            return ResponseEntity.notFound().build();
        else{
            // TODO: 19/03/23 controllare gli input (immobile)
            immobile1.setNome(immobile.getNome());
            immobile1.setTipo(immobile.getTipo());
            immobile1.setPrezzo(immobile.getPrezzo());
            immobile1.setDescrizione(immobile.getDescrizione());
            immobile1.setMetri_quadri(immobile.getMetri_quadri());
            immobile1.setIndirizzo(immobile.getIndirizzo());
            if(DBManager.getInstance().getImmobileDAO().saveOrUpdate(immobile1))
                return ResponseEntity.ok(immobile1);
            else return ResponseEntity.internalServerError().build();
        }
    }
}
