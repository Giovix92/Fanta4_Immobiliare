package com.fanta4.immobiliare.service;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.model.Immobile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImmobileService {

    public void createImmobile(Immobile immobile) {
        // TODO: 19/03/23 da inserire i controlli sugli input (immobile)
        DBManager.getInstance().getImmobileDAO().saveOrUpdate(immobile);
    }

    public ResponseEntity<Immobile> getByID(Integer id) {
        Immobile immobile = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if (immobile == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(immobile); //genera un entità di risposta positiva
        // TODO: 19/03/23 controllo da fare: controllo sulla validità dell'ID 
    }

    public ResponseEntity<List<Immobile>> getAllEntries() {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findAll();
        if(immobili == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(immobili);
    }

    public ResponseEntity<List<Immobile>> getAllEntriesLP() {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findByLowerPrice();
        if(immobili == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(immobili);
    }

    public ResponseEntity<List<Immobile>> getAllEntriesLPDESC() {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findByLowerPriceDESC();
        if(immobili == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(immobili);
    }

    public ResponseEntity<List<Immobile>> getAllEntriesLA() {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findByLowerArea();
        if(immobili == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(immobili);
    }

    public ResponseEntity<List<Immobile>> getAllEntriesLADESC() {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findByLowerAreaDESC();
        if(immobili == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(immobili);
    }

    public ResponseEntity<Integer> getLastAddedByOwner(String cf) {
        Integer immobile_id = DBManager.getInstance().getImmobileDAO().getLastAddedByOwner(cf);
        if (immobile_id == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(immobile_id); //genera un entità di risposta positiva
    }

    public ResponseEntity<List<Immobile>> findAllByOwner(String cf) {
        List<Immobile> immobili = DBManager.getInstance().getImmobileDAO().findAllByOwner(cf);
        if (immobili == null)
            return ResponseEntity.notFound().build(); //se non esiste restituisce il '404:file not found'
        return ResponseEntity.ok(immobili); //genera un entità di risposta positiva
    }

    public ResponseEntity<Object> deleteByID(Integer id) {
        Immobile immobile = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if(immobile == null)
            return ResponseEntity.notFound().build();
        DBManager.getInstance().getImmobileDAO().delete(immobile);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Immobile> updateImmobile(Integer id, Immobile immobile) {
        Immobile immobile1 = DBManager.getInstance().getImmobileDAO().findByPrimaryKey(id);
        if(immobile == null)
            return ResponseEntity.notFound().build();
        else{
            // TODO: 19/03/23 controllare gli input (immobile)
            immobile1.setNome(immobile.getNome());
            immobile1.setTipo(immobile.getTipo());
            immobile1.setPrezzo_orig(immobile.getPrezzo_orig());
            immobile1.setDescrizione(immobile.getDescrizione());
            immobile1.setMetri_quadri(immobile.getMetri_quadri());
            immobile1.setIndirizzo(immobile.getIndirizzo());
            immobile1.setTipo_annuncio(immobile.getTipo_annuncio());
            immobile1.setPrezzo_attuale(immobile.getPrezzo_attuale());
            if(DBManager.getInstance().getImmobileDAO().saveOrUpdate(immobile1))
                return ResponseEntity.ok(immobile1);
            else return ResponseEntity.internalServerError().build();
        }
    }
}
