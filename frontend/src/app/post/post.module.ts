import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { PostCardComponent } from './components/post-list/post-card.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {MaterialModule} from "../material/material.module";
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
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TooltipModule} from "primeng/tooltip";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {OverlayModule} from "primeng/overlay";
import { LikeButtonComponent } from './components/like-button/like-button.component';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    PostCardComponent,
    PostFormComponent,
    PostCommandBarComponent,
    LikeButtonComponent
  ],
  exports: [
    PostCardComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    NotifierModule,
    FileModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([PostState]),
    TranslateModule,
    MatGridListModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    OverlayPanelModule,
    TooltipModule,
    CdkConnectedOverlay,
    OverlayModule,
    CdkOverlayOrigin
  ]

})
export class PostModule { }
