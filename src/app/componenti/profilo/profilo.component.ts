import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AuthService } from 'src/app/auth/auth.service';
import { ServiceService } from 'src/app/Service/service.service';
import { SuccessdialogComponent } from 'src/app/componenti/successdialog/successdialog.component';
import { ErrordialogComponent } from '../errordialog/errordialog.component';

@Component({
    selector: 'app-profilo',
    templateUrl: './profilo.component.html',
    styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
    isEditing: boolean = false;
    showPassword: boolean = false;

    nomeValue: string = '';
    cognomeValue: string = '';
    telefonoValue: string = '';
    emailValue: string = '';
    passwordValue: string = '';
    tipologiaValue: string = '';
    id: string = '';

    constructor(private service: ServiceService, public dialog: MatDialog, private auth: AuthService) {}

    ngOnInit(): void {
        if(!this.auth.isLoggedIn) window.open("http://localhost:4200/home", "_self")
        this.nomeValue = localStorage.getItem("nome") || "";
        this.cognomeValue = localStorage.getItem("cognome") || "";
        this.telefonoValue = localStorage.getItem("telefono") || "";
        this.emailValue = localStorage.getItem("email") || "";
        this.passwordValue = localStorage.getItem("password") || "";
        this.tipologiaValue = localStorage.getItem("tipologia") || "";
        this.id = localStorage.getItem("id") || "";
    }

    toggleEditing(): void {
        this.isEditing = !this.isEditing;
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    sendToServer(): void {
        this.service.updateUtente(this.id, {
            nome: this.nomeValue,
            cognome: this.cognomeValue,
            id: this.id,
            telefono: this.telefonoValue,
            email: this.emailValue,
            password: this.passwordValue,
            tipologia: this.tipologiaValue,
            bannato: false,
        }).subscribe({
            next: () => {
                localStorage.setItem("nome", this.nomeValue);
                localStorage.setItem("cognome", this.cognomeValue);
                localStorage.setItem("telefono", this.telefonoValue);
                localStorage.setItem("email", this.emailValue);
                localStorage.setItem("password", this.passwordValue);
                localStorage.setItem("tipologia", this.tipologiaValue);
            },
            error: () => this.dialog.open(ErrordialogComponent),
            complete: () => {
              this.dialog.open(SuccessdialogComponent);
              this.isEditing = !this.isEditing;
            }
        });
    }
}
