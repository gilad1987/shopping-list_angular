import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket-service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {JoinComponent} from './components/join/join.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public list = [];
    public form;
    public user: any = {};
    public users = [];

    public displayList: boolean = false;

    constructor(
        public socketService: SocketService,
        public dialog: MatDialog) {
        this.user.index = this.getRandomInt();

        this.socketService.initSocket();

        this.socketService.onMessage().subscribe((message) => {
            this.list = message.db.products;
            this.users = message.db.users;
        });
    }

    getRandomInt(min = 0, max = 1000000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ngOnInit() {
        this.form = new FormGroup({
            item: new FormControl('')
        });


        setTimeout(() => {
            this.dialog.open(JoinComponent, {data: {}}).afterClosed().subscribe(name => {
                this.user.name = name;

                this.socketService.send({
                    action: 'JOIN',
                    user: this.user,
                });

                this.displayList = true;
            });
        }, 0);
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
