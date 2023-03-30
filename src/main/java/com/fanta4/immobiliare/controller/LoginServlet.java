package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.model.Utente;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/doLogin")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        UtenteDao udao = DBManager.getInstance().getUtenteDAO();
        Utente utente = udao.findByEmail(email);
        boolean logged = false;

        if(utente != null) {
            if (password.equals(utente.getPassword())) {
                logged = true;
                HttpSession session = req.getSession();
                session.setAttribute("utente", utente);
            }
        }

        if(logged) {
            resp.sendRedirect("/");
        } else {
            String errorMessage = "Le credenziali fornite non sono valide";
            String script = "<script>alert('" + errorMessage + "');window.location.href='Login.html';</script>";
            resp.setContentType("text/html");
            resp.getWriter().println(script);
        }
    }
}
