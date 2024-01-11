import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
 eventSource :any;

 mySubject = new Subject<MessageEvent>();
 connect(): Observable<MessageEvent> {
    this.eventSource = new EventSource('http://localhost:5041/api/sse');

    return new Observable<MessageEvent>((observer) => {
      this.eventSource.addEventListener('message', (event: MessageEvent) => {
        this.mySubject.next(event);
      });

      this.eventSource.addEventListener('error', (errorEvent: Event) => {
        if (errorEvent.eventPhase === EventSource.CLOSED) {
          this.mySubject.complete();
        } else {
          this.mySubject.error(errorEvent);
        }
      });
    });
  }
 

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
