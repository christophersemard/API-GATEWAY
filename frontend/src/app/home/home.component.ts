// src/app/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, NgIf, NgFor, NgClass], // FormsModule est nécessaire pour [(ngModel)] et NgIf pour le message d'erreur
})
export class HomeComponent implements OnInit, OnDestroy {
  rooms: any[] = [];
  messages: any[] = [];
  selectedRoom: any = null;
  newRoomName = '';
  newMessageContent = '';
  messageSubscription: Subscription | null = null;
  currentUser = 'MichelTestAngular';

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.fetchRooms();

    // Récupérer la lastRoom depuis le localStorage si elle existe
    const lastRoom = localStorage.getItem('lastRoom');
    if (lastRoom) {
      this.selectRoom(JSON.parse(lastRoom));
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  fetchRooms(): void {
    this.http.get<any[]>('http://localhost:3001/rooms').subscribe((data) => {
      console.log(data);
      this.rooms = data;
    });
  }

  selectRoom(room: any): void {
    this.selectedRoom = room;
    console.log('selectedRoom', room);
    this.fetchMessages(room._id);

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.messageSubscription = this.websocketService
      .connectToRoom(room._id)
      .subscribe((newMessage) => {
        this.messages.push(newMessage);
      });

    // Sauvegarder la lastRoom dans le localStorage
    localStorage.setItem('lastRoom', JSON.stringify(room));
  }

  fetchMessages(roomId: string): void {
    console.log('roomId', roomId);
    this.http
      .get<any[]>(`http://localhost:3001/messages/room/${roomId}`)
      .subscribe((data) => {
        console.log('messages', data);
        this.messages = data;
      });
  }

  addRoom(): void {
    if (this.newRoomName.trim()) {
      this.http
        .post('http://localhost:3001/rooms', { name: this.newRoomName })
        .subscribe(() => {
          this.newRoomName = '';
          this.fetchRooms();
        });
    }
  }

  sendMessage(): void {
    if (this.newMessageContent.trim() && this.selectedRoom) {
      const message = {
        roomId: this.selectedRoom._id,
        sender: this.currentUser, // Utilisateur actuel
        content: this.newMessageContent,
      };

      // Ajouter immédiatement le message localement
      this.messages.push(message);

      // Envoyer le message via WebSocket
      this.websocketService.sendMessage(message);

      // Réinitialiser le champ de saisie du message
      this.newMessageContent = '';
    }
  }
}
