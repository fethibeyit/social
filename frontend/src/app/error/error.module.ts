import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierComponent } from './error/notifier.component';
import {MaterialModule} from "../material/material.module";
import {StoreModule} from "@ngrx/store";
import {ErrorReducer} from "./state/error-reducers";
import { NotifierSnackbarComponent } from './error-snackbar/notifier-snackbar.component';


@NgModule({
  declarations: [
    NotifierComponent,
    NotifierSnackbarComponent
  ],
  exports: [
    NotifierComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('ErrorState', ErrorReducer),
  ]
})
export class ErrorModule { }
