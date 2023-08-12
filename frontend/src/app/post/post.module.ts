import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {MaterialModule} from "../material/material.module";
import {PostRoutingModule} from "./post-routing.module";
import { PostCommandBarComponent } from './components/post-command-bar/post-command-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {PostReducer} from "./state/post-reducers";
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "./state/post-effects";



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    PostListComponent,
    PostFormComponent,
    PostCommandBarComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('PostState', PostReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class PostModule { }
