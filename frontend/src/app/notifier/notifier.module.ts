import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierSnackbarComponent } from './notifier-snackbar/notifier-snackbar.component';
import {NotifierComponent} from "./notifier/notifier.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers : [
  ]
})
export class NotifierModule {}
