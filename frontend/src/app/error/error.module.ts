import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import {MaterialModule} from "../material/material.module";
import {StoreModule} from "@ngrx/store";
import {ErrorReducer} from "./state/error-reducers";
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';


@NgModule({
  declarations: [
    ErrorComponent,
    ErrorSnackbarComponent
  ],
  exports: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('ErrorState', ErrorReducer),
  ]
})
export class ErrorModule { }
