package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.model.Utente;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;

@Controller
public class LoginController {

    @PostMapping("/doLogin")
    protected String doLogin(HttpServletRequest req, HttpServletResponse resp, Model model) throws ServletException, IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        UtenteDao udao = DBManager.getInstance().getUtenteDAO();
        Utente utente = udao.findByEmail(email);
        boolean logged = false;
        HttpSession session = req.getSession();

        if (utente != null) {
            if (utente.getBannato()) {
                String errorMessage = "Questo utente è bannato.";
                model.addAttribute("errorMessage", errorMessage);
                return "login";
            } else if (password.equals(utente.getPassword())) {
                logged = true;
                session.setAttribute("utente", utente);
                session.setAttribute("sessionId", session.getId());
                req.getServletContext().setAttribute(session.getId(), session);
            }
        }

        if (logged) {
            resp.sendRedirect("http://localhost:4200/home?sessionId=" + session.getId());
            return null;
        } else {
            String errorMessage = "Le credenziali fornite non sono valide";
            model.addAttribute("errorMessage", errorMessage);
            return "login";
        }
    }
}
