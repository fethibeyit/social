import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import {FormsModule} from "@angular/forms";
import {NgxEditorModule} from "ngx-editor";
import {NgxsModule} from "@ngxs/store";
import {CommentState} from "./state/comment-state";
import {AvatarGroupModule} from "primeng/avatargroup";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {LikeModule} from "../like/like.module";
import {TranslateModule} from "@ngx-translate/core";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    CommentComponent,

  ],
  exports: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxsModule.forFeature([CommentState]),
    FormsModule,
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
