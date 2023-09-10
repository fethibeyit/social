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
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./state/auth-state";

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
    NgxsModule.forFeature([AuthState]),
  ]
})
export class AuthModule { }
