import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MentionModule} from "angular-mentions";
import {EditorModule} from "primeng/editor";
import {ProseMirrorEditorComponent} from "./prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";
import {
  ProseMirrorDisplayComponent
} from "./prosemirror/components/prose-mirror-display/prose-mirror-display.component";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {CdkConnectedOverlay} from "@angular/cdk/overlay";
import {TooltipModule} from "primeng/tooltip";
import { UserTooltipComponent } from './user-tooltip/user-tooltip.component';
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {TabMenuModule} from "primeng/tabmenu";
import {MenuModule} from "primeng/menu";
import {TieredMenuModule} from "primeng/tieredmenu";
import {MegaMenuModule} from "primeng/megamenu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {SlideMenuModule} from "primeng/slidemenu";
import {AvatarProfileComponent} from "./components/avatar-profile/avatar-profile.component";


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
    UserTooltipComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MentionModule,
    EditorModule,
    ButtonModule,
    ToolbarModule,
    DropdownModule,
    CdkConnectedOverlay,
    TooltipModule,
    CardModule,
    AvatarModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    TabMenuModule,
    MenuModule,
    TieredMenuModule,
    MegaMenuModule,
    OverlayPanelModule,
    SlideMenuModule,
    AvatarProfileComponent,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ProseMirrorEditorComponent,
    ProseMirrorDisplayComponent,
  ]
})
export class SharedModule { }
