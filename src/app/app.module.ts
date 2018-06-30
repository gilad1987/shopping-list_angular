import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './shared/material';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';
import { JoinComponent } from './components/join/join.component';
import { ProductCheckedPipe } from './pipes/product-checked.pipe';
import { ProductUnCheckedPipe } from './pipes/product-un-checked.pipe';

@NgModule({
    declarations: [
        AppComponent,
        JoinComponent,
        ProductCheckedPipe,
        ProductUnCheckedPipe
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
    ],
    entryComponents: [
        JoinComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
