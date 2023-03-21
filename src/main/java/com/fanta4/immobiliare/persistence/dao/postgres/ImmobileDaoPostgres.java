package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.IdBroker;
import com.fanta4.immobiliare.persistence.dao.ImmobileDao;
import com.fanta4.immobiliare.persistence.model.Immobile;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ImmobileDaoPostgres implements ImmobileDao {
    Connection connection;
    public ImmobileDaoPostgres(Connection connection) { //crea la connessione con il DB
        this.connection = connection;
    }

    @Override
    public List<Immobile> findAll() {
        ArrayList<Immobile> immobili = new ArrayList<>();
        String query = "select * from immobili";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()){
                Immobile i = new Immobile();
                i.setId(rs.getLong("id"));
                i.setNome(rs.getString("nome"));
                i.setTipo(rs.getString("tipo"));
                i.setPrezzo(rs.getDouble("prezzo"));
                i.setDescrizione(rs.getString("descrizione"));
                i.setMetri_quadri(rs.getDouble("metri_quadri"));
                i.setIndirizzo(rs.getString("indirizzo"));

                immobili.add(i);
            }
            return immobili;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;}
    }

    @Override
    public Immobile findByPrimaryKey(Long id) {
        String query = "select * from immobili where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1,id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                Immobile i = new Immobile();
                i.setId(rs.getLong("id"));
                i.setNome(rs.getString("nome"));
                i.setTipo(rs.getString("tipo"));
                i.setPrezzo(rs.getDouble("prezzo"));
                i.setDescrizione(rs.getString("descrizione"));
                i.setMetri_quadri(rs.getDouble("metri_quadri"));
                i.setIndirizzo(rs.getString("indirizzo"));

                return i;
            }
            return null;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean saveOrUpdate(Immobile immobile) {
        String insertQuery = "insert into immobili values(?,?,?,?,?,?,?)";
        String updateQuery = "update immobili set nome = ?, tipo = ?, prezzo = ?, descrizione = ?, metri_quadri = ?, indirizzo = ? where id = ?";
        PreparedStatement st = null;
        try {
            if(immobile.getId() == null) {
                st = connection.prepareStatement(insertQuery);
                Long newid = IdBroker.getImmobileId(connection);
                st.setLong(1,newid);
                st.setString(2, immobile.getNome());
                st.setString(3, immobile.getTipo());
                st.setDouble(4,immobile.getPrezzo());
                st.setString(5,immobile.getDescrizione());
                st.setDouble(6,immobile.getMetri_quadri());
                st.setString(7,immobile.getIndirizzo());
            }
            else{
                st = connection.prepareStatement(updateQuery);
                st.setString(1, immobile.getNome());
                st.setString(2, immobile.getTipo());
                st.setDouble(3,immobile.getPrezzo());
                st.setString(4,immobile.getDescrizione());
                st.setDouble(5,immobile.getMetri_quadri());
                st.setString(6,immobile.getIndirizzo());
                st.setLong(7,immobile.getId());
            }
            st.executeUpdate();
            return true;
        }
        catch (SQLException e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void delete(Immobile immobile) {
        String query = "delete from immobili where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, immobile.getId());
            st.executeUpdate();
        }
        catch (SQLException e){
            e.printStackTrace();
        }
    }
}
