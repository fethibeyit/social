import { Injectable } from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {PostModel} from "../models/postModel.interface";
import {PostService} from "../services/post.service";
import {Post} from "./post-actions";
import {FileState} from "../../file/state/file-state";
import {AppFile} from "../../file/state/file-actions";


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

  constructor(private PostService: PostService, private store: Store) {}

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
    ctx.patchState({loading: true})
    try{
      const data = await this.PostService.getPosts().toPromise();
      ctx.patchState({ posts: data});
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Post.Create)
  protected async createPost(ctx: LocalStateContext, action: Post.Create): Promise<void> {
    const { post } = action;
    const files = this.store.selectSnapshot(FileState.filesMetadat);
    post.files = [...files];
    ctx.patchState({loading: true})
    try{
      const data = await this.PostService.createPost(post).toPromise();
      if (data){
        ctx.patchState( {posts : [...ctx.getState().posts, data]});
        ctx.dispatch(new AppFile.ClearMetadata());
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Post.Update)
  protected async updatePost(ctx: LocalStateContext, action: Post.Update): Promise<void> {
    const { post } = action;
    ctx.patchState({loading: true})
    try{
      const data = await this.PostService.updatePost(post).toPromise();
      ctx.patchState( {posts : ctx.getState().posts.map(x => x.id === post.id ? post : x)});
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Post.Delete)
  protected async deletePost(ctx: LocalStateContext, action: Post.Delete): Promise<void> {
    const { post } = action;
    ctx.patchState({deleteLoading: true, selected : post})
    try{
      const data = await this.PostService.deletePost(post.id).toPromise();
      ctx.patchState( {posts : ctx.getState().posts.filter(x=> x.id!= post.id)});
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

}
