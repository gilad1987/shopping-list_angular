import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

    public usernameFormControl = new FormControl('', [Validators.required]);

    constructor(public dialogRef: MatDialogRef<JoinComponent>) {
    }

    ngOnInit() {
    }

    send(name) {
        this.dialogRef.close(name);
    }

}
