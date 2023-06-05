package com.fanta4.immobiliare.controller;

import com.fanta4.immobiliare.persistence.DBManager;
import com.fanta4.immobiliare.persistence.dao.UtenteDao;
import com.fanta4.immobiliare.persistence.model.Utente;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegistrationController {

    @PostMapping("/doRegistration")
    public String doRegistration(@RequestParam("name") String name,
                                 @RequestParam("surname") String surname,
                                 @RequestParam("cf") String cf,
                                 @RequestParam("email") String email,
                                 @RequestParam("phone") Long phone,
                                 @RequestParam("role") String role,
                                 @RequestParam("password") String password,
                                 Model model) {

        UtenteDao udao = DBManager.getInstance().getUtenteDAO();
        Utente utente = udao.findByPrimaryKey(cf);
        Utente utente2 = udao.findByEmail(email);

        if (utente == null && utente2 == null) {
            boolean reg = udao.saveOrUpdate(new Utente(cf, name, surname, email, phone, role, password, false));
            if (reg) {
                // Registrazione andata a buon fine: popup
                String successMessage = "Utente registrato con successo! Effettua il login per procedere.";
                model.addAttribute("successMessage", successMessage);
            } else {
                // Registrazione non andata a buon fine: popup
                String errorMessage = "Server error!";
                model.addAttribute("errorMessage", errorMessage);
            }
        } else {
            // Utente già esistente: popup
            String errorMessage = "Utente già esistente!";
            model.addAttribute("errorMessage", errorMessage);
        }
        return "registrazione";
    }
}
