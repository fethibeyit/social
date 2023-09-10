import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import {PostModel} from "../models/postModel.interface";
import {PostService} from "../services/post.service";
import {Post} from "./post-actions";



export interface PostStateModel {
  posts: ReadonlyArray<PostModel>;
  loading : boolean;
  deleteLoading : boolean;
  selected : PostModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<PostStateModel>;

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    loading: false,
    deleteLoading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class PostState implements NgxsOnInit {
  constructor(private PostService: PostService) {}

  @Selector()
  static posts(state: PostStateModel): readonly PostModel[] {
    return state.posts;
  }

  @Selector()
  static selectedPost(state: PostStateModel): PostModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: PostStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static deleteLoading(state: PostStateModel): boolean {
    return state.deleteLoading;
  }

  ngxsOnInit(ctx: StateContext<PostStateModel>): void {
    ctx.dispatch(new Post.GetList());
  }

  @Action(Post.GetList)
  protected async getList(ctx: LocalStateContext, action: Post.GetList): Promise<void> {
    const data = await this.PostService.getPosts().toPromise();
    ctx.patchState({ posts: data });
  }

  @Action(Post.Create)
  protected async createPost(ctx: LocalStateContext, action: Post.Create): Promise<void> {
    const { post } = action;
    const data = await this.PostService.createPost(post).toPromise();
    ctx.patchState( {posts : [...ctx.getState().posts, post]});
  }

  @Action(Post.Update)
  protected async updatePost(ctx: LocalStateContext, action: Post.Update): Promise<void> {
    const { post } = action;
    const data = await this.PostService.updatePost(post).toPromise();
    ctx.patchState( {posts : ctx.getState().posts.map(x => x.id === post.id ? post : x)});
  }

  @Action(Post.Delete)
  protected async deletePost(ctx: LocalStateContext, action: Post.Delete): Promise<void> {
    const { post } = action;
    const data = await this.PostService.deletePost(post.id).toPromise();
    ctx.patchState( {posts : ctx.getState().posts.filter(x=> x.id!= post.id)});
  }

}
