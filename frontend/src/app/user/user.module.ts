import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {AppUserState} from "./state/appUser-state";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AppUserState]),
    TranslateModule,
  ],
  exports :[
  ]
})
export class AppUserModule { }
