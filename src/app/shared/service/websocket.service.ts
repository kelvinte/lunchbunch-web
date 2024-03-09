import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  constructor() {}

  connect() {
    // this.socket = new WebSocket('ws://localhost:8080/socks');
    // this.socket.onmessage = (event) => {
    //   this.message = event.data;
    // };
  }
}
