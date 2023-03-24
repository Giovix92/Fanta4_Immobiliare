package com.fanta4.immobiliare.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IdBroker {
    //Standard SQL (queste stringhe andrebbero scritte in un file di configurazione
    //private static final String query="SELECT NEXT VALUE FOR SEQUENZA_ID AS id";

    //private static final String query = "SELECT nextval('db_sequence') AS id";//postgresql

    public static Integer getId(Connection connection, String query) {
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet result = statement.executeQuery();
            result.next();
            return result.getInt("id");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


    public static Integer getImmobileId(Connection connection){
        return getId(connection, "select nextval('immobili_id') as id");
    }

    public static Integer getRecensioneId(Connection connection) {
        return getId(connection, "select nextval('recensioni_id') as id");
    }

    public static Integer getAsteId(Connection connection){
        return getId(connection, "select nextval('aste_id') as id");
    }
}
