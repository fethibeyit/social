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
import { ProseMirrorDisplayComponent } from './components/prose-mirror-display/prose-mirror-display.component';
import {AvatarGroupModule} from "primeng/avatargroup";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {LikeModule} from "../like/like.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    CommentEditComponent,
    ProseMirrorComponent,
    ProseMirrorDisplayComponent
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
    NgxEditorModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    DividerModule,
    LikeModule,
    TranslateModule
  ]
})
export class CommentModule { }
