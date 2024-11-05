// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard'; // Nous allons créer ce fichier après
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route publique pour login
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Route protégée
  { path: 'dashboard', component: DashboardComponent }, // Route protégée
  { path: 'expenses', component: ExpensesComponent }, // Route protégée
  { path: '**', redirectTo: '/login' }, // Redirection vers /login pour les routes non trouvées
];
