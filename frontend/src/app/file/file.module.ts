import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragNDropComponent} from "./components/drag-n-drop/drag-n-drop.component";
import {DragNDropDirective} from "./directives/drag-n-drop.directive";
import {DialogConfirmComponent} from "./components/dialog-confirm/dialog-confirm.component";
import {MaterialModule} from "../material/material.module";

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
    MaterialModule
  ]
})
export class FileModule { }
