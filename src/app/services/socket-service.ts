import {Injectable, isDevMode} from '@angular/core';

import {Message} from '../shared/model/message';
import {Event} from '../shared/model/event';

import * as socketIo from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket;
    private baseUrl = isDevMode() ? 'http://localhost:8080' : 'http://104.197.52.12/shopoing_api/';

    public initSocket(): void {
        this.socket = socketIo(this.baseUrl);
    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
