import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { PostListComponent } from './pages/list/post-list.component';
import { FormComponent } from './pages/form/form.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostFormComponent } from './components/post-form/post-form.component';
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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    PostListComponent,
    FormComponent,
    PostCardComponent,
    PostFormComponent,
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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]

})
export class PostModule { }
