import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Post} from "../models/post.interface";

export const PostActions = createActionGroup({
  source: 'POST',
  events: {
    'Get post list' : emptyProps(),
    'Get post list success' : props<{ posts: ReadonlyArray<Post> }>(),
    'Get post list failure' : props<{ error: string }>(),
    'Delete post' : props<{ post: Post }>(),
    'Delete post success' : props<{ postId: string }>(),
    'Delete post failure' : props<{ error: string }>(),
  }
})

// export enum PostActions {
//   GET_POST_LIST = '[Post] Get post list',
//   SET_POST_LIST = '[post] Set Post list',
// }

// export const getPostList = createAction(
//   PostActions.GET_POST_LIST,
// );

// export const setPostList = createAction(
//   PostActions.SET_POST_LIST,
//   props<{ Posts: ReadonlyArray<Post> }>(),
// );
