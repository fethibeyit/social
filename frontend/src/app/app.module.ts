import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {environment} from "../environments/environment";
import {NotifierModule} from "./notifier/notifier.module";
import { JwtModule } from '@auth0/angular-jwt';
import {NgxsModule, NoopNgxsExecutionStrategy} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {AppErrorHandler} from "./core/handlers/app-error-handler";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatSelectModule} from "@angular/material/select";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NotifierModule,
    MatSelectModule, // to remove after (like button depend)
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {injectContainerState: false, suppressErrors: false},
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production, maxAge: 25}),
    NgxsStoragePluginModule.forRoot({key: "auth.token"}),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => JSON.parse(localStorage.getItem("auth.token") ?? "{}"),
        allowedDomains: [environment.domainURL],
        disallowedRoutes: [
          environment.authURL + '/auth',
          environment.authURL + '/register',
        ]
      }
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    // { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

