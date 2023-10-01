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
import {NotifierModule} from "../notifier/notifier.module";
import {NgxsModule} from "@ngxs/store";
import {PostState} from "./state/post-state";
import {TranslateModule} from "@ngx-translate/core";

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
        NotifierModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([PostState]),
        TranslateModule,
    ]
})
export class PostModule { }
