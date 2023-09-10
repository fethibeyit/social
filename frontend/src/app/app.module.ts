import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "./shared/shared.module";
import {environment} from "../environments/environment";
import {ErrorModule} from "./error/error.module";
import { JwtModule } from '@auth0/angular-jwt';
import {HeaderInterceptor} from "./core/interceptors/header.interceptor";
import {NgxsModule, NoopNgxsExecutionStrategy} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    SharedModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: { injectContainerState: false, suppressErrors: false },
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled:environment.production, maxAge:25}),
    NgxsStoragePluginModule.forRoot({ key: "auth.token" }),
    ErrorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => JSON.parse(localStorage.getItem("auth.token") ?? ""),
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/auth']
      }
    })
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
