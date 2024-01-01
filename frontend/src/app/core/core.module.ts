import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProseMirrorEditorComponent} from "./prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";
import {
  ProseMirrorDisplayComponent
} from "./prosemirror/components/prose-mirror-display/prose-mirror-display.component";
import {MentionModule} from "angular-mentions";
import {EditorModule} from "primeng/editor";
import {CommentComponent} from "../comment/components/comment/comment.component";

@NgModule({
  declarations: [
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
  ],
  exports: [
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
  ],
  imports: [
    CommonModule,
    MentionModule,
    EditorModule,
  ]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() core:CoreModule ){
  //   if (core) {
  //     throw new Error("Core module should only be imported to the Root Module")
  //   }
  // }
}
