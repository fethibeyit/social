import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import { NotifierSnackbarComponent } from './error-snackbar/notifier-snackbar.component';


@NgModule({
  declarations: [
    // NotifierComponent,
    NotifierSnackbarComponent
  ],
  exports: [
    // NotifierComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // StoreModule.forFeature('ErrorState', ErrorReducer),
  ]
})
export class ErrorModule { }
