import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  constructor() {}

  add(message: string): void {
    of(1)
      .pipe(delay(500), take(1))
      .subscribe(() => {
        this.messages.push(message);
      });
  }

  get(): Observable<string[]> {
    return of(this.messages);
  }

  clear(): void {
    this.messages = [];
  }

  // TODO: send messages to log server
}
