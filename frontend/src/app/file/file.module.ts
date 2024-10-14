import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DragNDropComponent} from "./components/drag-n-drop/drag-n-drop.component";
import {DragNDropDirective} from "./directives/drag-n-drop.directive";
import {NgxsModule} from "@ngxs/store";
import {FileState} from "./state/file-state";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {TranslateModule} from "@ngx-translate/core";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    DragNDropComponent,
    DragNDropDirective
  ],
  exports: [
    DragNDropComponent
  ],
    imports: [
        CommonModule,
        NgxsModule.forFeature([FileState]),
        CdkVirtualScrollViewport,
        TranslateModule,
        CardModule,
        ButtonModule,
        NgOptimizedImage
    ]
})
export class FileModule { }
