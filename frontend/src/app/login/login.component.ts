// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assurez-vous que ce service est bien créé
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgIf], // FormsModule est nécessaire pour [(ngModel)] et NgIf pour le message d'erreur
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour gérer la soumission du formulaire
  login(): void {
    console.log('login', this.username, this.password);
    // Appel au service d'authentification avec username et password
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('loginRESPONSE', response);

        // Stocker le token dans le localStorage
        localStorage.setItem('jwtToken', response.access_token);

        // Si la connexion est réussie, rediriger vers la page d'accueil
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('loginERROR', error);
        // En cas d'échec, afficher un message d'erreur
        this.errorMessage =
          'Login failed. Please check your credentials and try again.';
      },
    });
  }
}
