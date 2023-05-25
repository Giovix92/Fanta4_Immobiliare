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

    constructor(private auth: AuthService, private service: ServiceService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.nomeValue = this.auth.utenteCorrente.nome;
        this.cognomeValue = this.auth.utenteCorrente.cognome;
        this.telefonoValue = this.auth.utenteCorrente.telefono;
        this.emailValue = this.auth.utenteCorrente.email;
        this.passwordValue = this.auth.utenteCorrente.password;
        this.tipologiaValue = this.auth.utenteCorrente.tipologia;
    }

    toggleEditing(): void {
        this.isEditing = !this.isEditing;
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    sendToServer(): void {
        this.service.updateUtente(this.auth.utenteCorrente.id, {
            nome: this.nomeValue,
            cognome: this.cognomeValue,
            id: this.auth.utenteCorrente.id,
            telefono: this.telefonoValue,
            email: this.emailValue,
            password: this.passwordValue,
            tipologia: this.tipologiaValue,
            bannato: false,
        }).subscribe({
            next: () => {
                this.auth.utenteCorrente.nome = this.nomeValue;
                this.auth.utenteCorrente.cognome = this.cognomeValue;
                this.auth.utenteCorrente.telefono = this.telefonoValue;
                this.auth.utenteCorrente.email = this.emailValue;
                this.auth.utenteCorrente.password = this.passwordValue;
                this.auth.utenteCorrente.tipologia = this.tipologiaValue;
            },
            error: () => this.dialog.open(ErrordialogComponent),
            complete: () => {
              this.dialog.open(SuccessdialogComponent);
              this.isEditing = !this.isEditing;
            }
        });
    }
}
