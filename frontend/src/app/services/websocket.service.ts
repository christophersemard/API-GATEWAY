// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket | null = null;

  constructor() {}

  // Connexion au WebSocket en ajoutant le JWT dans les en-têtes d'autorisation
  connectToRoom(roomId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Récupérer le token JWT depuis le localStorage
    console.log('token:', token);
    // Créer la connexion WebSocket avec l'en-tête Authorization
    this.socket = io('http://localhost:3001', {
      auth: {
        token: `Bearer ${token}`, // Envoyer le token dans l'en-tête Authorization
      },
    });

    // Envoyer l'événement pour rejoindre la room
    this.socket.emit('joinRoom', roomId);

    // Écouter les messages dans la room
    return new Observable((observer) => {
      this.socket?.on('message', (message) => {
        console.log('newMessage', message);
        observer.next(message);
      });
    });
  }

  // Envoyer un message
  sendMessage(message: any): void {
    this.socket?.emit('message', message);
  }

  // Fermer la connexion WebSocket
  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}
