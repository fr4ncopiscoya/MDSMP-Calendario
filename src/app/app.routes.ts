import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EventoHomeComponent } from './pages/calendario/evento-home/evento-home.component';
import { EventoCrearComponent } from './pages/calendario/evento-crear/evento-crear.component';


export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: InicioComponent },

  { path: 'eventos', component: EventoHomeComponent },
  { path: 'evento-crear', component: EventoCrearComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
