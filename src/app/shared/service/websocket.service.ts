import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { AuthService } from './auth.service';
import { exhaustMap, take, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  constructor(private authService: AuthService) {}

  connect(lunchPlanUuid) {
    this.socket = new WebSocket(
      AppSettings.LUNCH_PLAN_WS_ENDPOINT + '?suggest=' + lunchPlanUuid,
    );

    this.socket.onclose = (closeEvent) => {
      console.log('Failed to connect');
      this.socket = null;
    };
    this.socket.onopen = (openEvent) => {
      console.log('Opened');
    };
    // this.authService.user.pipe(take(1)).subscribe((user) => {
    //   if (user) {
    //     this.socket = new WebSocket(
    //       AppSettings.LUNCH_PLAN_WS_ENDPOINT + '?auth=' + user,
    //     );
    //
    //     this.socket.addEventListener('open', (event) => {
    //       console.log('WebSocket connection established');
    //       // Send your initial message here (if needed)
    //       this.socket.send('');
    //
    //       // this.socket.sendMessage('Hello from Angular!');
    //     });
    //   }
    // });

    // this.socket.onmessage = (event) => {
    //   this.message = event.data;
    // };

    // this.socket.send('test');
    // this.socket.onmessage = (event) => {};
  }

  sendMessage() {
    if (this.socket) {
    }
  }
}
