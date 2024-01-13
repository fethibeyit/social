import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotifierComponent} from "./notifier/notifier.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    NotifierComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    NotifierComponent
  ],
  providers: []
})
export class NotifierModule {}
