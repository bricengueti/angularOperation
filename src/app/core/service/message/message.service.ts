import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<Message | null>(null);
  private defaultDuration = 5000; // 5 seconds

  getMessage(): Observable<Message | null> {
    return this.messageSubject.asObservable();
  }

  showSuccess(text: string, duration?: number): void {
    this.showMessage({ text, type: 'success', duration: duration || this.defaultDuration });
  }

  showError(text: string, duration?: number): void {
    this.showMessage({ text, type: 'error', duration: duration || this.defaultDuration });
  }

  showInfo(text: string, duration?: number): void {
    this.showMessage({ text, type: 'info', duration: duration || this.defaultDuration });
  }

  showWarning(text: string, duration?: number): void {
    this.showMessage({ text, type: 'warning', duration: duration || this.defaultDuration });
  }

  private showMessage(message: Message): void {
    this.messageSubject.next(message);

    if (message.duration) {
      setTimeout(() => this.clear(), message.duration);
    }
  }

  clear(): void {
    this.messageSubject.next(null);
  }
}
