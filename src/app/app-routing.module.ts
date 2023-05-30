import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { SupportoComponent } from './componenti/sidenav/supporto/supporto.component';
import { ChiSiamoComponent } from './componenti/sidenav/chi-siamo/chi-siamo.component';
import { PrivacyComponent } from './componenti/sidenav/privacy/privacy.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { AggiungiAnnuncioComponent } from './componenti/aggiungi-annuncio/aggiungi-annuncio.component';
import { AdminCplComponent } from './componenti/admin-cpl/admin-cpl.component';
import { AnnuncioComponent } from './componenti/annuncio/annuncio.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'supporto', component: SupportoComponent},
    {path: 'chi-siamo', component: ChiSiamoComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'profilo', component: ProfiloComponent},
    {path: 'aggiungi-annuncio', component: AggiungiAnnuncioComponent},
    {path: 'admin-cpl', component: AdminCplComponent},
    {path: 'annuncio/:id', component: AnnuncioComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
