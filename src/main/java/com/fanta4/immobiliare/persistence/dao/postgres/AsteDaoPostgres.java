package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.IdBroker;
import com.fanta4.immobiliare.persistence.dao.AsteDao;
import com.fanta4.immobiliare.persistence.model.Aste;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AsteDaoPostgres implements AsteDao {
    Connection connection;

    public AsteDaoPostgres(Connection connection) {
        this.connection = connection;
    }

    public Aste createNewEntity(ResultSet rs) throws SQLException {
        Aste a = new Aste();
        a.setId(rs.getInt("id"));
        a.setImmobile(rs.getInt("immobile"));
        a.setProprietario(rs.getString("proprietario"));
        a.setAcquirente(rs.getString("acquirente"));
        a.setPrezzo_partenza(rs.getInt("prezzo_partenza"));
        a.setPrezzo_corrente(rs.getInt("prezzo_corrente"));
        a.setPartenza(rs.getTimestamp("partenza"));
        a.setFine(rs.getTimestamp("fine"));
        return a;
    }

    @Override
    public List<Aste> findAll() {
        ArrayList<Aste> aste = new ArrayList<>();
        String query = "select * from aste";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { aste.add(createNewEntity(rs)); }
            return aste;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Aste findByPrimaryKey(Integer id) {
        String query = "select * from aste where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            if(rs.next()) { return createNewEntity(rs); }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean saveOrUpdate(Aste aste) {
        PreparedStatement st = null;
        Integer id = null;
        try {
            if(aste.getId() == null) {
                String insertQuery = "insert into aste(immobile, proprietario, acquirente, prezzo_partenza, prezzo_corrente, partenza, fine, id) values(?,?,?,?,?,?,?,?)";
                st = connection.prepareStatement(insertQuery);
                id = IdBroker.getAsteId(connection);
            } else {
                String updateQuery = "update aste set immobile = ?, proprietario = ?, acquirente = ?, prezzo_partenza = ?, prezzo_corrente = ?, partenza = ?, fine = ? where id = ?";
                st = connection.prepareStatement(updateQuery);
                id = aste.getId();
            }
            st.setInt(1, aste.getImmobile());
            st.setString(2, aste.getProprietario());
            st.setString(3, aste.getAcquirente());
            st.setInt(4, aste.getPrezzo_partenza());
            st.setInt(5, aste.getPrezzo_corrente());
            st.setTimestamp(6, aste.getPartenza());
            st.setTimestamp(7, aste.getFine());
            st.setInt(8, id);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void delete(Aste aste) {
        if(findByPrimaryKey(aste.getId()) == null) return;
        String query = "delete from aste where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1, aste.getId());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
