import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import { NotifierSnackbarComponent } from './notifier-snackbar/notifier-snackbar.component';
import {NotifierComponent} from "./notifier/notifier.component";

@NgModule({
  declarations: [
    NotifierComponent,
    NotifierSnackbarComponent,
  ],
  exports: [
    NotifierComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers : [
  ]
})
export class NotifierModule {}
