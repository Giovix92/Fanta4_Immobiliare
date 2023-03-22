package com.fanta4.immobiliare.persistence;

import com.fanta4.immobiliare.persistence.dao.ImmobileDao;
import com.fanta4.immobiliare.persistence.dao.RecensioneDao;
import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.dao.postgres.ImmobileDaoPostgres;
import com.fanta4.immobiliare.persistence.dao.postgres.RecensioneDaoPostgres;
import com.fanta4.immobiliare.persistence.dao.postgres.UtenteDaoPostgres;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    //SINGLETON
    private static DBManager instance = null;

    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }
    private DBManager() {
    }

    //END SINGLETON


    //PARAMETERS
    Connection conn = null;

    public Connection getConnection() {
        if (conn == null) {
            try {
                // TODO: 30/12/2022 ricordarsi di inserire la propria password locale
                conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", "postgres");
            }
            catch (SQLException e) {

            }
        }
        return conn;
    }

    public ImmobileDao getImmobileDAO(){
        return new ImmobileDaoPostgres(getConnection());
    }

    public RecensioneDao getRecensioneDAO(){
        return new RecensioneDaoPostgres(getConnection());
    }

    public UtenteDao getUtenteDAO() {
        return new UtenteDaoPostgres(getConnection());
    }
}

