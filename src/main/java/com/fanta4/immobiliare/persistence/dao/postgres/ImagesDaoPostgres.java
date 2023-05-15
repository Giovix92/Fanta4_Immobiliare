package com.fanta4.immobiliare.persistence.dao.postgres;

import com.fanta4.immobiliare.persistence.IdBroker;
import com.fanta4.immobiliare.persistence.dao.ImagesDao;
import com.fanta4.immobiliare.persistence.model.Images;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ImagesDaoPostgres implements ImagesDao {
    Connection connection;
    public ImagesDaoPostgres(Connection connection) { //crea la connessione con il DB
        this.connection = connection;
    }

    public Images createNewEntity(ResultSet rs) throws SQLException {
        Images i = new Images();
        i.setId(rs.getInt("id"));
        i.setImmobile(rs.getInt("immobile"));
        i.setImg(rs.getString("img"));
        return i;
    }

    @Override
    public List<Images> findAll() {
        ArrayList<Images> images = new ArrayList<>();
        String query = "select * from images";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { images.add(createNewEntity(rs)); }
            return images;
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Images findByPrimaryKey(Integer id) {
        String query = "select * from images where id=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1,id);
            ResultSet rs = st.executeQuery();
            if(rs.next()) { return createNewEntity(rs); }
        }
        catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Images> findByImmobileID(Integer id) {
        ArrayList<Images> images = new ArrayList<>();
        String query = "select * from images where immobile=?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();
            while(rs.next()) { images.add(createNewEntity(rs)); }
            return images;
        } catch (SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean save(Images image) {
        try {
            Integer id = IdBroker.getImagesId(connection);
            String insertQuery = "insert into images(id, immobile, img) values(?,?,?)";
            PreparedStatement st = connection.prepareStatement(insertQuery);
            st.setInt(1, id);
            st.setInt(2, image.getImmobile());
            st.setString(3, image.getImg());

            st.executeUpdate();
            return true;
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void delete(Images image) {
        if (findByPrimaryKey(image.getId()) == null) return;
        String query = "delete from images where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setInt(1, image.getId());
            st.executeUpdate();
        }
        catch(SQLException e) {
            // TODO: Delete stacktrace and add proper sql exception
            e.printStackTrace();
        }
    }
}
