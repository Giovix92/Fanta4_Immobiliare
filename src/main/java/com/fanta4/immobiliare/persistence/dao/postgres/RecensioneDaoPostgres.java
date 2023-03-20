package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.model.Recensione;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RecensioneDaoPostgres {

    Connection connection;

    public RecensioneDaoPostgres(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<Recensione> findAll() {
        ArrayList<Recensione> recensioni = new ArrayList<>();
        String query = "select * from recensioni";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()){
                Recensione r = new Recensione();
                r.setId(rs.getLong("id"));
                r.setTitolo(rs.getString("titolo"));
                r.setRating(rs.getShort("rating"));
                r.setAutore(rs.getString("autore"));
                r.setImmobile(rs.getLong("immobile"));

                recensioni.add(r);
            }
            return recensioni;

        }
        catch (SQLException e){
            e.printStackTrace();
            return null;
        }
    }
}
