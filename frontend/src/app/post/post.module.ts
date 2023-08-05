import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {MaterialModule} from "../material/material.module";
import {PostRoutingModule} from "./post-routing.module";



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    PostListComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule
  ]
})
export class PostModule { }
