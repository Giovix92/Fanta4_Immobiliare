import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "src/app/auth/auth.service";
import { Utente } from "src/app/Model/Utente";
import { ServiceService } from 'src/app/Service/service.service';

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

  constructor(private service: ServiceService, private auth: AuthService) {}

  ngOnInit(): void {
    this.changeUserTypeForm = new FormGroup({
      user_id_1: new FormControl(),
      user_type: new FormControl()
    });

    this.banUserForm = new FormGroup({
      user_id_2: new FormControl()
    });
  }

  onUserTypeFormSubmit() {
    try {
      this.service.getUtente(this.changeUserTypeForm.value.user_id_1).subscribe(
        data => {
          this.utente = new Utente();
          this.utente = data;

          this.utente.tipologia = this.changeUserTypeForm.value.user_type;

          this.service.updateUtente(this.utente.id, {
            nome: this.utente.nome,
            cognome: this.utente.cognome,
            id: this.utente.id,
            telefono: this.utente.telefono,
            email: this.utente.telefono,
            password: this.utente.password,
            tipologia: this.utente.tipologia,
            bannato: this.utente.bannato,
          }).subscribe()
        }
      )
    } catch (err) {
      console.log('Oops!', err)
      return false;
    }
    return true;
  }

  onBanUserFormSubmit() {
    console.log("STARTING BAN");
    try {
      this.service.getUtente(this.banUserForm.value.user_id_2).subscribe(
        data => {
          this.utente = new Utente();
          this.utente = data;

          this.utente.bannato = true;
          console.log("CALLING UPDATE");

          this.service.updateUtente(this.utente.id, {
            nome: this.utente.nome,
            cognome: this.utente.cognome,
            id: this.utente.id,
            telefono: this.utente.telefono,
            email: this.utente.telefono,
            password: this.utente.password,
            tipologia: this.utente.tipologia,
            bannato: this.utente.bannato,
          }).subscribe(data => console.log(data))
        }
      )
    } catch (err) {
      console.log('Oops!', err)
      return false;
    }
    return true;
  }
    

  onValueUserTypeSelected(event: any) {
    const selectedValue = event.target.value;
    this.selectedValueUserType = selectedValue;
  }
}
