import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {PostActions} from "./post-actions";
import {PostService} from "../services/post.service";


@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private PostService: PostService,
    private router: Router
  ) {}

  getPosts$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PostActions.GET_POST_LIST),
        mergeMap(() => this.PostService.getPosts()
          .pipe(
            map(Posts => ({ type: PostActions.SET_POST_LIST, Posts })),
            catchError(() => EMPTY)
          ))
      )
    }, {dispatch: true}
  );


}
