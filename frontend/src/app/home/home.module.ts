import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {PostModule} from "../post/post.module";
import {HomeComponent} from "./pages/home/home.component";
import {HomeRoutingModule} from "./home-routing.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    PostModule,
  ],

})
export class HomeModule { }
