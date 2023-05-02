import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componenti/GestioneProfilo/login/login.component';
import { SupportoComponent } from './componenti/sidenav/supporto/supporto.component';
import { PrivacyComponent } from './componenti/sidenav/privacy/privacy.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { ChiSiamoComponent } from './componenti/sidenav/chi-siamo/chi-siamo.component';
import { HomeComponent } from './componenti/home/home.component';
import { RegistrazioneComponent } from './componenti/GestioneProfilo/registrazione/registrazione.component';
import { ProfiloComponent } from './componenti/GestioneProfilo/profilo/profilo.component';
import { PagAnnuncioComponent } from './componenti/pag-annuncio/pag-annuncio.component';
import { AggiungiAnnuncioComponent } from './componenti/sidenav/aggiungi-annuncio/aggiungi-annuncio.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupportoComponent,
    PrivacyComponent,
    DashboardComponent,
    ChiSiamoComponent,
    HomeComponent,
    RegistrazioneComponent,
    ProfiloComponent,
    PagAnnuncioComponent,
    AggiungiAnnuncioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatSelectModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
