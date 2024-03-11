import { EventEmitter, Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { AuthService } from './auth.service';
import { BehaviorSubject, exhaustMap, take, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { WebsockModel } from '../model/websock.model';
import { Suggestion } from '../model/suggestion.model';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private socket: WebSocket;

  isConnected = new BehaviorSubject<boolean>(false);

  suggestions: Suggestion[];
  suggestionsEmitter = new EventEmitter<Suggestion[]>();

  constructor(private authService: AuthService) {}

  connect(lunchPlanUuid) {
    this.socket = new WebSocket(
      AppSettings.LUNCH_PLAN_WS_ENDPOINT + '?suggest=' + lunchPlanUuid
    );

    this.socket.onerror = (error) => {
      console.log('Error happened ' + error);
    };
    this.socket.onclose = (closeEvent) => {
      console.log('Failed to connect');
      this.socket = null;
      this.isConnected.next(false);
    };
    this.socket.onopen = (openEvent) => {
      console.log('Opened');
      this.isConnected.next(true);
    };
    this.socket.onmessage = (message) => {
      console.log(message);
      var resp = <WebsockModel<any>>JSON.parse(message.data);
      if (resp == null || !resp['action']) {
        return;
      }

      if (resp.action == 'RETRIEVE_SUGGESTIONS') {
        this.suggestions = resp.data;
        this.suggestionsEmitter.emit(this.suggestions.slice());
      }

      if (resp.action == 'NOTIFY_ONE_SUGGESTION') {
        this.suggestions.push(resp.data);
        this.suggestionsEmitter.emit(this.suggestions.slice());
      }
    };
  }

  suggest(data: { restaurant: string; suggestedBy: string }) {
    if (this.socket) {
      const websockMsg = new WebsockModel('SUGGEST', data);

      this.socket.send(JSON.stringify(websockMsg));
    }
  }

  retrieve() {
    if (this.socket) {
      const websockMsg = new WebsockModel('RETRIEVE_SUGGESTIONS', {});
      this.socket.send(JSON.stringify(websockMsg));
    }
  }

  setSuggestions(suggestions: Suggestion[]) {
    this.suggestions = suggestions;
    this.suggestionsEmitter.emit(this.suggestions.slice());
  }
}
