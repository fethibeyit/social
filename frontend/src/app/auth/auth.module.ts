import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../core/core.module";
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {RouterLink} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";
import {StoreModule} from "@ngrx/store";
import {PostReducer} from "../post/state/post-reducers";
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "../post/state/post-effects";
import {AuthReducer} from "./state/auth-reducers";
import {AuthEffects} from "./state/auth-effects";



@NgModule({
  declarations: [
    AuthFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterLink,
    AuthRoutingModule,
    StoreModule.forFeature('AuthState', AuthReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
