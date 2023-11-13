import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {LikeState} from "./state/like-state";
import {LikeButtonComponent} from "./components/like-button/like-button.component";
import {ButtonModule} from "primeng/button";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {TranslateModule} from "@ngx-translate/core";
import {TooltipModule} from "primeng/tooltip";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {OverlayModule} from "primeng/overlay";

@NgModule({
  declarations: [
    LikeButtonComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([LikeState]),
    ButtonModule,
    CdkOverlayOrigin,
    TranslateModule,
    CdkConnectedOverlay,
    TooltipModule,
    OverlayPanelModule,
    OverlayModule,
  ],
  exports :[
    LikeButtonComponent
  ]
})
export class LikeModule { }
