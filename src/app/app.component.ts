import {Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public list = [];
    public form;
    public user: any = {};


    constructor(public socketService: SocketService) {
        this.user.index = this.getRandomInt();

        this.socketService.initSocket();

        this.socketService.onMessage().subscribe((message) => {

            if (message.user.index === this.user.index && message.action === 'CHECK') {
                return;
            }

            if (message.user.index === this.user.index && message.action === 'DELETE') {
                const exists = this.list.filter((p) => (p.index === message.product.index));
                if (exists.length) {
                    const index = this.list.indexOf(exists[0]);
                    this.list.splice(index, 1);
                }
                return;
            }


            this.list = message.list;
        });
    }

    getRandomInt(min = 0, max = 1000000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ngOnInit() {
        this.form = new FormGroup({
            item: new FormControl('')
        });
    }

    delete(product) {
        this.socketService.send({
            action: 'DELETE',
            user: this.user,
            product: product
        });
    }

    add(productName) {

        const product = {
            index: Math.random(),
            name: productName,
            checked: false,
            removed: false,
            user: this.user
        };

        this.socketService.send({
            action: 'ADD',
            user: this.user,
            product: product
        });

        this.form.reset();
    }

    onChecked(event, product) {
        product.checked = event.checked;
        this.socketService.send(Object.assign({}, {
            action: 'CHECK',
            user: this.user,
            product: product
        }));
    }
}
