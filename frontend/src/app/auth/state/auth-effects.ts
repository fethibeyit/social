import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of} from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {AuthActions} from "./auth-actions";
import {AuthenticateService} from "../../core/services/authenticate.service";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService : AuthenticateService,
    private router: Router
  ) {}

  loginuser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({credentials})  => this.authService.login(credentials)
          .pipe(
            map(data => AuthActions.setToken({token: data['access-token']})),
            catchError((error) => of(AuthActions.authError({error: error.message})))
          ))
      )
    }, {dispatch: true}
  );

}
