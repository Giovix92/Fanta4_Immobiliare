package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.IdBroker;
import com.fanta4.immobiliare.persistence.dao.RecensioneDao;
import com.fanta4.immobiliare.persistence.model.Recensione;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RecensioneDaoPostgres implements RecensioneDao {

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
        }
        return null;
    }

    @Override
    public Recensione findByPrimaryKey(Long id) {
        String query = "select * from recensioni where id = ?";
        try{
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1,id);
            ResultSet rs = st.executeQuery();
            if(rs.next()){
                Recensione r = new Recensione();
                r.setId(rs.getLong("id"));
                r.setTitolo(rs.getString("titolo"));
                r.setRating(rs.getShort("rating"));
                r.setAutore(rs.getString("autore"));
                r.setImmobile(rs.getLong("immobile"));

                return r;
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean saveOrUpdate(Recensione recensione) {
        PreparedStatement st = null;
        Long id = null;
        try{
            if(recensione.getId() == null){
                String insertQuery = "insert into recensioni(titolo, rating, autore, immobile, id) values(?,?,?,?,?)";
                st = connection.prepareStatement(insertQuery);
                id = IdBroker.getRecensioneId(connection);
            } else {
                String updateQuery = "update recensioni set titolo = ?, rating = ?, autore = ?, immobile = ? where id = ?";
                st = connection.prepareStatement(updateQuery);
                id = recensione.getId();
            }
            st.setString(1, recensione.getTitolo());
            st.setShort(2, recensione.getRating());
            st.setString(3, recensione.getAutore());
            st.setLong(4, recensione.getImmobile());
            st.setLong(5, id);

            st.executeUpdate();
            return true;
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void delete(Recensione recensione) {
        String query = "delete from recensioni where id = ?";
        try{
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, recensione.getId());
            st.executeUpdate();

        }
        catch(SQLException e){
            e.printStackTrace();
        }
    }
}
