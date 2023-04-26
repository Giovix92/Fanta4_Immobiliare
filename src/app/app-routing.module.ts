import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { SupportoComponent } from './componenti/sidenav/supporto/supporto.component';
import { ChiSiamoComponent } from './componenti/sidenav/chi-siamo/chi-siamo.component';
import { PrivacyComponent } from './componenti/sidenav/privacy/privacy.component';
import { LoginComponent } from './componenti/GestioneProfilo/login/login.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { RegistrazioneComponent } from './componenti/GestioneProfilo/registrazione/registrazione.component';
import { ProfiloComponent } from './componenti/GestioneProfilo/profilo/profilo.component';
import { PagAnnuncioComponent } from './componenti/pag-annuncio/pag-annuncio.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'supporto', component: SupportoComponent},
    {path: 'chi-siamo', component: ChiSiamoComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrazione', component: RegistrazioneComponent},
    {path: 'profilo', component: ProfiloComponent},
    {path: 'pag-annuncio', component: PagAnnuncioComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
