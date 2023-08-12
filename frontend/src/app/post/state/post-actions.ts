import { createAction, props } from '@ngrx/store';
import {Post} from "../models/post.interface";

export enum PostActions {
  GET_POST_LIST = '[Anti-Hero] Get Anti-Hero list',
  SET_POST_LIST = '[Anti-Hero] Set Anti-Hero list',
}

export const getPostList = createAction(
  PostActions.GET_POST_LIST,
);

export const setPostList = createAction(
  PostActions.SET_POST_LIST,
  props<{ Posts: ReadonlyArray<Post> }>(),
);
