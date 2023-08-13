import {createReducer, on} from "@ngrx/store";
import {Post} from "../models/post.interface";
import {PostActions} from "./post-actions";


export interface Process {
  loading : boolean ;
  error : string | null;
}

const defaultProcess : Process = {loading: false, error: null};

export interface PostState {
  posts: ReadonlyArray<Post>;
  selected : Post | null;
  getProcess : Process;
  deleteProcess : Process;
}

export const initialState: PostState = {
  posts: [],
  selected : null,
  getProcess: defaultProcess,
  deleteProcess: defaultProcess,
}

export const PostReducer = createReducer(
  initialState,
  on(PostActions.getPostList, (state) => {
    return {...state, getProcess: {loading: true, error: null}}}),
  on(PostActions.getPostListSuccess, (state, { posts }) => {
    return {...state, posts, getProcess: {loading: false, error: null}}}),
  on(PostActions.getPostListFailure, (state, { error }) => {
    return {...state, getProcess:{loading:false, error}}}),
  on(PostActions.deletePost, (state, {post}) => {
    return {...state, selected:post, deleteProcess: {loading: true, error: null}}}),
  on(PostActions.deletePostSuccess, (state, { postId }) =>
    { return {...state, selected:null ,posts: state.posts.filter(x=> x.id!= postId), deleteProcess: {loading: false, error: null}}}),
  on(PostActions.deletePostFailure, (state, { error }) => {
    console.log(error);
    return {...state, selected:null, deleteProcess:{loading:false, error}};
  }),
  on(PostActions.createPost, (state, {post}) => {
    return {...state, selected:post, getProcess: {loading: true, error: null}}}),
  on(PostActions.createPostSuccess, (state, { post }) =>
  { return {...state, selected:null ,posts: [...state.posts, post], getProcess: {loading: false, error: null}}}),
  on(PostActions.createPostFailure, (state, { error }) => {
    return {...state, selected:null, getProcess:{loading:false, error}}}),
  on(PostActions.updatePost, (state, {post}) => {
    return {...state, selected:post, getProcess: {loading: true, error: null}}}),
  on(PostActions.updatePostSuccess, (state, { post }) =>
  { return {...state, selected:null ,posts: state.posts.map(x => x.id === post.id ? post : x), getProcess: {loading: false, error: null}}}),
  on(PostActions.updatePostFailure, (state, { error }) => {
    return {...state, selected:null, getProcess:{loading:false, error}}}),

);
