import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {MaterialModule} from "../material/material.module";
import {PostRoutingModule} from "./post-routing.module";
import { PostCommandBarComponent } from './components/post-command-bar/post-command-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "../notifier/notifier.module";
import {NgxsModule} from "@ngxs/store";
import {PostState} from "./state/post-state";
import {TranslateModule} from "@ngx-translate/core";
import { PostDragDropComponent } from './components/post-drag-drop/post-drag-drop.component';
import {MatListModule} from "@angular/material/list";
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    PostListComponent,
    PostFormComponent,
    PostCommandBarComponent,
    PostDragDropComponent,
    FileDragDropDirective,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    NotifierModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([PostState]),
    TranslateModule,
    NgOptimizedImage,

  ]

})
export class PostModule { }
