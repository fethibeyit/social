import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragNDropComponent} from "./components/drag-n-drop/drag-n-drop.component";
import {DragNDropDirective} from "./directives/drag-n-drop.directive";
import {DialogConfirmComponent} from "./components/dialog-confirm/dialog-confirm.component";
import {NgxsModule} from "@ngxs/store";
import {FileState} from "./state/file-state";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    DragNDropComponent,
    DragNDropDirective,
    DialogConfirmComponent
  ],
  exports: [
    DragNDropComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([FileState]),
    CdkVirtualScrollViewport,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class FileModule { }
