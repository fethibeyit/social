import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of} from 'rxjs';
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
        ofType(PostActions.getPostList),
        mergeMap(() => this.PostService.getPosts()
          .pipe(
            map(posts => PostActions.getPostListSuccess({posts})),
            catchError((error) => of(PostActions.getPostListFailure({error: error.message})))
          ))
      )
    }, {dispatch: true}
  );


  deletePost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PostActions.deletePost),
        mergeMap(({post}) => this.PostService.deletePost(post.id)
          .pipe(
            map(() => PostActions.deletePostSuccess({postId: post.id})),
            catchError((error) => of(PostActions.deletePostFailure({error: error.message})
            ))
          ))
      )
    }, {dispatch: true}
  );

  createPost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PostActions.createPost),
        mergeMap(({post}) => this.PostService.createPost(post)
          .pipe(
            map((post) => PostActions.createPostSuccess({post})),
            catchError((error) => of(PostActions.createPostFailure({error: error.message})))
          ))
      )
    }, {dispatch: true}
  );

  updatePost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PostActions.updatePost),
        mergeMap(({post}) => this.PostService.updatePost(post)
          .pipe(
            map((post) => PostActions.updatePostSuccess({post})),
            catchError((error) => of(PostActions.updatePostFailure({error: error.message})))
          ))
      )
    }, {dispatch: true}
  );

}
