import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import { NotifierSnackbarComponent } from './error-snackbar/notifier-snackbar.component';
import {NotifierComponent} from "./error/notifier.component";

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
export class ErrorModule {}
