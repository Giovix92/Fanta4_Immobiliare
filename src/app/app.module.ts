import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SupportoComponent } from './componenti/sidenav/supporto/supporto.component';
import { PrivacyComponent } from './componenti/sidenav/privacy/privacy.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { ChiSiamoComponent } from './componenti/sidenav/chi-siamo/chi-siamo.component';
import { HomeComponent } from './componenti/home/home.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { AggiungiAnnuncioComponent } from './componenti/aggiungi-annuncio/aggiungi-annuncio.component';
import { AdminCplComponent } from './componenti/admin-cpl/admin-cpl.component';
import { AnnuncioComponent } from './componenti/annuncio/annuncio.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SupportoComponent,
    PrivacyComponent,
    DashboardComponent,
    ChiSiamoComponent,
    HomeComponent,
    ProfiloComponent,
    AggiungiAnnuncioComponent,
    AdminCplComponent,
    AnnuncioComponent,
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
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
