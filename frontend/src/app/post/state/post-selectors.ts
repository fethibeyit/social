import { createSelector, createFeatureSelector } from '@ngrx/store';
import {PostState} from "./post-reducers";


export const selectPostState = createFeatureSelector<PostState>('PostState')

export const selectPosts = () => createSelector(
  selectPostState,
  (state: PostState) => state.posts
)

export const selectSelected = () => createSelector(
  selectPostState,
  (state: PostState) => state.selected
)
export const selectPost = (id: string) => createSelector(
  selectPostState,
  (state: PostState) => state.posts.find(p => p.id === id)
)

export const selectLoading = () => createSelector(
  selectPostState,
  (state: PostState) => state.loading
)

export const selectDeleteLoading= () => createSelector(
  selectPostState,
  (state: PostState) => state.deleteLoading
)
