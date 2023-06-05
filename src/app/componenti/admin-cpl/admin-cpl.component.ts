import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "src/app/auth/auth.service";
import { Utente } from "src/app/Model/Utente";
import { ServiceService } from 'src/app/Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrordialogComponent } from 'src/app/componenti/errordialog/errordialog.component';
import { SuccessdialogComponent } from 'src/app/componenti/successdialog/successdialog.component';

@Component({
  selector: 'app-admin-cpl',
  templateUrl: './admin-cpl.component.html',
  styleUrls: ['./admin-cpl.component.css']
})
export class AdminCplComponent implements OnInit {
  public changeUserTypeForm: FormGroup = new FormGroup({});
  public banUserForm: FormGroup = new FormGroup({});
  selectedValueUserType: String = "";
  public utente: any;

  constructor(private service: ServiceService, private auth: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if(!this.auth.isLoggedIn || !this.auth.isAdmin()) window.open("http://localhost:4200/home", "_self")
    this.changeUserTypeForm = new FormGroup({
      user_id_1: new FormControl(),
      user_type: new FormControl()
    });

    this.banUserForm = new FormGroup({
      user_id_2: new FormControl()
    });
  }

  onUserTypeFormSubmit() {
      this.service.getUtente(this.changeUserTypeForm.value.user_id_1).subscribe({
        next: (data) => {
          this.utente = new Utente();
          this.utente = data;

          this.utente.tipologia = this.changeUserTypeForm.value.user_type;

          this.service.updateUtente(this.utente.id, {
            nome: this.utente.nome,
            cognome: this.utente.cognome,
            id: this.utente.id,
            telefono: this.utente.telefono,
            email: this.utente.email,
            password: this.utente.password,
            tipologia: this.utente.tipologia,
            bannato: this.utente.bannato,
          }).subscribe({
            error: () => this.dialog.open(ErrordialogComponent),
          })
        },
        error: () => this.dialog.open(ErrordialogComponent),
        complete: () => this.dialog.open(SuccessdialogComponent),
      });
    return true;
  }

  onBanUserFormSubmit() {
      this.service.getUtente(this.banUserForm.value.user_id_2).subscribe({
        next: (data) => {
          this.utente = new Utente();
          this.utente = data;

          this.utente.bannato = true;

          this.service.updateUtente(this.utente.id, {
            nome: this.utente.nome,
            cognome: this.utente.cognome,
            id: this.utente.id,
            telefono: this.utente.telefono,
            email: this.utente.email,
            password: this.utente.password,
            tipologia: this.utente.tipologia,
            bannato: this.utente.bannato,
          }).subscribe({
            error: () => this.dialog.open(ErrordialogComponent),
          })
        },
        error: () => this.dialog.open(ErrordialogComponent),
        complete: () => this.dialog.open(SuccessdialogComponent),
      });
  }


  onValueUserTypeSelected(event: any) {
    const selectedValue = event.target.value;
    this.selectedValueUserType = selectedValue;
  }
}
