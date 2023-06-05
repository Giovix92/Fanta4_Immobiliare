package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.model.Utente;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/doRegistration")
public class RegistrationServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        String surname = req.getParameter("surname");
        String cf = req.getParameter("cf");
        String email = req.getParameter("email");
        Long phone = Long.valueOf(req.getParameter("phone"));
        String role = req.getParameter("role");
        String password = req.getParameter("password");

        UtenteDao udao = DBManager.getInstance().getUtenteDAO();
        Utente utente = udao.findByPrimaryKey(cf);
        Utente utente2 = udao.findByEmail(email);

        if(utente == null && utente2 == null) {
            boolean reg = udao.saveOrUpdate(new Utente(cf,name,surname,email,phone,role,password,false));
            if(reg) {
                // Registrazione andata a buon fine: popup
                String successMessage = "Registrazione completata con successo! Sarai reindirizzato alla pagina di login.";
                String script = "<script>alert('" + successMessage + "');window.location.href='Login.html';</script>";
                resp.setContentType("text/html");
                resp.getWriter().println(script);
            } else {
                // Registrazione non andata a buon fine: popup
                String errorMessage = "Server error!";
                String script = "<script>alert('" + errorMessage + "');window.location.href='Registrazione.html';</script>";
                resp.setContentType("text/html");
                resp.getWriter().println(script);
            }
        } else {
            // Utente già esistente: popup
            String errorMessage = "Utente già esistente, sarai reindirizzato alla pagina di login.";
            String script = "<script>alert('" + errorMessage + "');window.location.href='Login.html';</script>";
            resp.setContentType("text/html");
            resp.getWriter().println(script);
        }
    }
}
