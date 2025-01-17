import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { PostListComponent } from './pages/list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCreateDialogComponent } from './components/post-create-dialog/post-create-dialog.component';
import {PostRoutingModule} from "./post-routing.module";
import { PostCommandBarComponent } from './components/post-command-bar/post-command-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "../notifier/notifier.module";
import {NgxsModule} from "@ngxs/store";
import {PostState} from "./state/post-state";
import {TranslateModule} from "@ngx-translate/core";
import {FileModule} from "../file/file.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {TooltipModule} from "primeng/tooltip";
import {LikeModule} from "../like/like.module";
import {DividerModule} from "primeng/divider";
import {AvatarGroupModule} from "primeng/avatargroup";
import {CommentModule} from "../comment/comment.module";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AvatarProfileComponent} from "../shared/components/avatar-profile/avatar-profile.component";
import {SharedModule} from "../shared/shared.module";
import {PostDialogComponent} from "./components/post-dialog/post-dialog.component";
import {ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostCardComponent,
    PostCreateDialogComponent,
    PostDialogComponent,
    PostCommandBarComponent
  ],
  exports: [
    PostCardComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    NotifierModule,
    FileModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([PostState]),
    TranslateModule,
    MatGridListModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    LikeModule,
    DividerModule,
    AvatarGroupModule,
    TooltipModule,
    CommentModule,
    ToolbarModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    AvatarProfileComponent,
    SharedModule,
    ScrollPanelModule
  ]

})
export class PostModule { }
