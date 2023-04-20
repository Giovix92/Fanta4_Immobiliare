package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.model.Utente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UtenteDaoPostgres implements UtenteDao {

    Connection connection;

    public UtenteDaoPostgres(Connection connection) { this.connection = connection; }

    public Utente createNewEntity(ResultSet rs) throws SQLException {
        Utente u = new Utente();
        u.setId(rs.getString("id"));
        u.setNome(rs.getString("nome"));
        u.setCognome(rs.getString("cognome"));
        u.setEmail(rs.getString("email"));
        u.setTelefono(rs.getLong("telefono"));
        u.setTipologia(rs.getString("tipologia"));
        // TODO: Hash password properly [1/2]
        u.setPassword(rs.getString("password"));
        // Houses of the user, JSON file
        u.setProprieta(rs.getString("proprieta"));
        return u;
    }

    @Override
    public List<Utente> findAll() {
        ArrayList<Utente> utenti = new ArrayList<>();
        String query = "select * from utenti";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { utenti.add(createNewEntity(rs)); }
            return utenti;
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Utente findByPrimaryKey(String cf) {
        String query = "select * from utenti where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, cf);
            ResultSet rs = st.executeQuery();
            if (rs.next()) { return createNewEntity(rs); }
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    public Utente findByEmail(String email) {
        String query = "select * from utenti where email=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, email);
            ResultSet rs = st.executeQuery();
            if (rs.next()) { return createNewEntity(rs); }
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean saveOrUpdate(Utente utente) {
        PreparedStatement st = null;
        String id = null;
        try {
            Utente u = findByPrimaryKey(utente.getId());
            // TODO: Hash password properly [2/2]
            if (u == null) {
                // User doesn't exist in the database, creating one
                String insertQuery = "insert into utenti(nome, cognome, email, telefono, tipologia, password, proprieta, id) values(?,?,?,?,?,?,?,?)";
                st = connection.prepareStatement(insertQuery);
            } else {
                // User exists in the database, updating its infos
                String updateQuery = "update utenti set nome = ?, cognome = ?, email = ?, telefono = ?, tipologia = ?, password = ?, proprieta = ? where id = ?";
                st = connection.prepareStatement(updateQuery);
            }
            st.setString(1, utente.getNome());
            st.setString(2, utente.getCognome());
            st.setString(3, utente.getEmail());
            st.setLong(4, utente.getTelefono());
            st.setString(5, utente.getTipologia());
            st.setString(6, utente.getPassword());
            st.setString(7, utente.getProprieta());
            st.setString(8, utente.getId());

            st.executeUpdate();
            return true;
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void delete(Utente utente) {
        if (findByPrimaryKey(utente.getId()) == null) return;
        String query = "delete from utenti where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, utente.getId());
            st.executeUpdate();
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
    }
}