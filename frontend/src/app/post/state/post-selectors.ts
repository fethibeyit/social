import { createSelector, createFeatureSelector } from '@ngrx/store';
import {PostState} from "./post-reducers";


export const selectPostState = createFeatureSelector<PostState>('PostState')

export const selectPosts = () => createSelector(
  selectPostState,
  (state: PostState) => state.Posts
)
export const selectPost = (id: string) => createSelector(
  selectPostState,
  (state: PostState) => state.Posts.find(p => p.id === id)
)
