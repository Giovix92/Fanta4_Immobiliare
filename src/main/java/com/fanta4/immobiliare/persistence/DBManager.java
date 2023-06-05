package com.fanta4.immobiliare.persistence;

import com.fanta4.immobiliare.persistence.dao.*;
import com.fanta4.immobiliare.persistence.dao.postgres.*;
import lombok.Data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Data
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

    public AsteDao getAsteDAO() {
        return new AsteDaoPostgres(getConnection());
    }

    public ImagesDao getImagesDAO() {
        return new ImagesDaoPostgres(getConnection());
    }
}

