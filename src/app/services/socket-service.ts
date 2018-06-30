import {Injectable, isDevMode} from '@angular/core';

import { Message } from '../shared/model/message';
import { Event } from '../shared/model/event';

import * as socketIo from 'socket.io-client';
import {Observable} from 'rxjs';

const SERVER_URL = 'http://localhost:8080';
const BASE_URL = isDevMode() ? 'http://localhost:8080' : 'http://104.197.52.12/shopoing_api';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
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
