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

    public Immobile createNewEntity(ResultSet rs) throws SQLException {
        Immobile i = new Immobile();
        i.setId(rs.getInt("id"));
        i.setNome(rs.getString("nome"));
        i.setTipo(rs.getString("tipo"));
        i.setPrezzo_orig(rs.getDouble("prezzo_orig"));
        i.setDescrizione(rs.getString("descrizione"));
        i.setMetri_quadri(rs.getDouble("metri_quadri"));
        i.setIndirizzo(rs.getString("indirizzo"));
        i.setProprietario(rs.getString("proprietario"));
        i.setTipo_annuncio(rs.getString("tipo_annuncio"));
        i.setPrezzo_attuale(rs.getDouble("prezzo_attuale"));
        return i;
    }

    public List<Immobile> genericFind(String query) {
        ArrayList<Immobile> immobili = new ArrayList<>();
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { immobili.add(createNewEntity(rs)); }
            return immobili;
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Immobile> findAll() {
        return genericFind("select * from immobili");
    }

    @Override
    public List<Immobile> findByLowerPrice() {
        return genericFind("select * from immobili order by prezzo");
    }

    @Override
    public List<Immobile> findByLowerPriceDESC() {
        return genericFind("select * from immobili order by prezzo DESC");
    }

    @Override
    public List<Immobile> findByLowerArea() {
        return genericFind("select * from immobili order by metri_quadri");
    }

    @Override
    public List<Immobile> findByLowerAreaDESC() {
        return genericFind("select * from immobili order by metri_quadri DESC");
    }

    @Override
    public Integer getLastAddedByOwner(String cf) {
        String query = "select MAX(id) AS max_id from immobili where proprietario=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, cf);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                return rs.getInt("max_id");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Immobile> findAllByOwner(String cf) {
        ArrayList<Immobile> immobili = new ArrayList<>();
        String query = "select * from immobili where proprietario=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, cf);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { immobili.add(createNewEntity(rs)); }
            return immobili;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Immobile findByPrimaryKey(Integer id) {
        String query = "select * from immobili where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                return createNewEntity(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean saveOrUpdate(Immobile immobile) {
        PreparedStatement st = null;
        Integer id = null;
        try {
            if(immobile.getId() == null) {
                String insertQuery = "insert into immobili(nome, tipo, prezzo_orig, descrizione, metri_quadri, indirizzo, proprietario, tipo_annuncio, prezzo_attuale, id) values(?,?,?,?,?,?,?,?,?,?)";
                st = connection.prepareStatement(insertQuery);
                id = IdBroker.getImmobileId(connection);
            } else {
                String updateQuery = "update immobili set nome = ?, tipo = ?, prezzo_orig = ?, descrizione = ?, metri_quadri = ?, indirizzo = ?, proprietario = ?, tipo_annuncio = ?, prezzo_attuale = ? where id = ?";
                st = connection.prepareStatement(updateQuery);
                id = immobile.getId();
            }
            st.setString(1, immobile.getNome());
            st.setString(2, immobile.getTipo());
            st.setDouble(3,immobile.getPrezzo_orig());
            st.setString(4,immobile.getDescrizione());
            st.setDouble(5,immobile.getMetri_quadri());
            st.setString(6,immobile.getIndirizzo());
            st.setString(7, immobile.getProprietario());
            st.setString(8, immobile.getTipo_annuncio());
            st.setDouble(9, immobile.getPrezzo_attuale());
            st.setInt(10, id);

            st.executeUpdate();
            return true;
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void delete(Immobile immobile) {
        if (findByPrimaryKey(immobile.getId()) == null) return;
        String query = "delete from immobili where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1, immobile.getId());
            st.executeUpdate();
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
    }
}
