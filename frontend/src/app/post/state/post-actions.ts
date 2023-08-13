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
    'Create post' : props<{ post: Post }>(),
    'Create post success' : props<{ post: Post }>(),
    'Create post failure' : props<{ error: string }>(),
    'Update post' : props<{ post: Post }>(),
    'Update post success' : props<{ post: Post }>(),
    'Update post failure' : props<{ error: string }>(),
  }
})
