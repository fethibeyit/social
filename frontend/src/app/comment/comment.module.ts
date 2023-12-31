import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';
import {MentionModule} from "angular-mentions";
import {FormsModule} from "@angular/forms";
import {EditorModule} from "primeng/editor";
import {NgxEditorModule} from "ngx-editor";
import { ProseMirrorComponent } from './components/prose-mirror/prose-mirror.component';
import {NgxsModule} from "@ngxs/store";
import {CommentState} from "./state/comment-state";



@NgModule({
  declarations: [
    CommentEditComponent,
    ProseMirrorComponent
  ],
  exports: [
    CommentEditComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([CommentState]),
    MentionModule,
    FormsModule,
    EditorModule,
    NgxEditorModule
  ]
})
export class CommentModule { }
