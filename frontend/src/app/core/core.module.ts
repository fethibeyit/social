import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "../auth/state/auth-state";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AuthState])
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core:CoreModule ){
    if (core) {
      throw new Error("Core module should only be imported to the Root Module")
    }
  }
}
