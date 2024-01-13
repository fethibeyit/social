import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MentionModule} from "angular-mentions";
import {EditorModule} from "primeng/editor";
import {ProseMirrorEditorComponent} from "./prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";
import {
  ProseMirrorDisplayComponent
} from "./prosemirror/components/prose-mirror-display/prose-mirror-display.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MentionModule,
    EditorModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
  ]
})
export class SharedModule { }
