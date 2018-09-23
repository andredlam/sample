import { WebsocketService } from './service/websocket.service';
import { Observable, Subject } from 'rxjs';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    messages: Subject<any>;

    constructor(private ioService: WebsocketService) {
        this.messages = <Subject<any>>ioService
        .connect()
        .pipe(map((response: any): any => {
            return response;
        }));
    }

    sendMessage(msg) {
        this.messages.next(msg);
    }

}
