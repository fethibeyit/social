import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './pages/home/home.component';
import {PostModule} from "../post/post.module";
import {SharedRoutingModule} from "./shared-routing.module";



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    SharedRoutingModule,
    PostModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
