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
        boolean logged;
        if(utente == null) {
            logged = false;
        } else {
            if (password.equals(utente.getPassword())){
                logged = true;
                HttpSession session = req.getSession();
                session.setAttribute("utente", utente);
            } else{
                logged = false;
            }
        }
        if(logged) {
            resp.sendRedirect("/");
        } else {
            String errorMessage = "Le credenziali fornite non sono valide";
            resp.setContentType("text/html");
            String script = "<script>document.getElementById('error-message').innerHTML = '" + errorMessage + "';" +
                    "document.getElementById('error-message').style.display = 'block';</script>";
            resp.getWriter().println(script);
        }
    }
}
