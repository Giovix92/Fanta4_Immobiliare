package com.fanta4.immobiliare.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IdBroker {
    //Standard SQL (queste stringhe andrebbero scritte in un file di configurazione
    //private static final String query="SELECT NEXT VALUE FOR SEQUENZA_ID AS id";

    //private static final String query = "SELECT nextval('db_sequence') AS id";//postgresql


    public static Long getImmobileId(Connection connection){
        Long id = null;
        try {
            PreparedStatement statement = connection.prepareStatement("select nextval('immobili_id') as id");

            ResultSet result = statement.executeQuery();
            result.next();
            id = result.getLong("id");

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return id;
    }

    public static Long getRecensioneId(Connection connection){
        Long id = null;
        try {
            PreparedStatement statement = connection.prepareStatement("select nextval('recensioni_id') as id");

            ResultSet result = statement.executeQuery();
            result.next();
            id = result.getLong("id");

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return id;
    }

}
