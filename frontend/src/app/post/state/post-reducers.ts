import {createReducer, on} from "@ngrx/store";
import {Post} from "../models/post.interface";
import {PostActions} from "./post-actions";

export interface PostState {
  posts: ReadonlyArray<Post>;
  loading : boolean;
  deleteLoading : boolean;
  selected : Post | null;
  error: string | null;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  deleteLoading: false,
  selected : null,
  error: null,
}

export const PostReducer = createReducer(
  initialState,
  on(PostActions.getPostList, (state) => {
    return {...state, loading: true}}),
  on(PostActions.getPostListSuccess, (state, { posts }) => {
    return {...state, posts, loading: false}}),
  on(PostActions.getPostListFailure, (state, { error }) => {
    return {...state, loading:false, error}}),

  on(PostActions.deletePost, (state, {post}) => {
    return {...state, selected:post, deleteLoading: true}}),
  on(PostActions.deletePostSuccess, (state, { postId }) =>
    { return {...state, selected:null ,posts: state.posts.filter(x=> x.id!= postId), deleteLoading: false}}),
  on(PostActions.deletePostFailure, (state, { error }) =>
  {return {...state, selected:null, deleteLoading:false, error}}),

  on(PostActions.createPost, (state, {post}) => {
    return {...state, loading: true}}),
  on(PostActions.createPostSuccess, (state, { post }) =>
  { return {...state, posts: [...state.posts, post], loading: false}}),
  on(PostActions.createPostFailure, (state, { error }) => {
    return {...state,  loading:false, error}}),

  on(PostActions.updatePost, (state, {post}) => {
    return {...state, loading: true}}),
  on(PostActions.updatePostSuccess, (state, { post }) =>
  { return {...state, posts: state.posts.map(x => x.id === post.id ? post : x), loading: false}}),
  on(PostActions.updatePostFailure, (state, { error }) => {
    return {...state, loading:false, error}}),

);
