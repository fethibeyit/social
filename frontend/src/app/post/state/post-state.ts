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
  protected async getList(ctx: LocalStateContext, _: Post.GetList): Promise<void> {
    ctx.patchState({loading: true})
    try{
      const posts = await this.PostService.getPosts().toPromise();
      if(posts){
        posts.forEach(p => {
          p.files.forEach(f => {
            if(f.type.startsWith('image')){
              ctx.dispatch(new AppFile.CreateImageUrl(f));
            }
          });
          p.comments = p.comments.reverse();
        })
        ctx.patchState({ posts: posts});
      }

    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Post.Create)
  protected async createPost(ctx: LocalStateContext, action: Post.Create): Promise<void> {
    const { post } = action;
    const files = this.store.selectSnapshot(FileState.filesMetadata);
    post.files = [...files];
    ctx.patchState({loading: true})

    const newPost = await this.PostService.createPost(post).toPromise();
    if (newPost){
      ctx.dispatch(new AppFile.ClearMetadata());
      ctx.dispatch(new Post.GetList());
    } else {
    ctx.patchState({loading: false})
    }
  }

  @Action(Post.Update)
  protected async updatePost(ctx: LocalStateContext, action: Post.Update): Promise<void> {
    const { post } = action;
    ctx.patchState({loading: true})
    try{
      const updatedPost = await this.PostService.updatePost(post).toPromise();
      if(updatedPost){
        ctx.patchState( {posts : ctx.getState().posts.map(x => x.id === post.id ? updatedPost : x)});
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Post.Delete)
  protected async deletePost(ctx: LocalStateContext, action: Post.Delete): Promise<void> {
    const { post } = action;
    ctx.patchState({deleteLoading: true, selected : post})
    try{
      await this.PostService.deletePost(post.id).toPromise();
      ctx.patchState( {posts : ctx.getState().posts.filter(x=> x.id !== post.id)});
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

  @Action(Post.AddLike)
  protected async addLike (ctx: LocalStateContext, action: Post.AddLike): Promise<void> {
    const { like } = action;
    ctx.patchState({posts : ctx.getState().posts.map(post =>
        post.id === like.post_id ? {...post, likes: [... post.likes, like] } : post)})
  }

  @Action(Post.UpdateLike)
  protected async updateLike (ctx: LocalStateContext, action: Post.UpdateLike): Promise<void> {
    const { like } = action;
    ctx.patchState({posts : ctx.getState().posts.map(post =>
        post.id === like.post_id ? {...post, likes:  post.likes.map(l => l.id === like.id ? like : l )} : post)})
  }

  @Action(Post.RemoveLike)
  protected async removeLike (ctx: LocalStateContext, action: Post.RemoveLike): Promise<void> {
    const { like } = action;
    ctx.patchState({posts : ctx.getState().posts.map(post =>
        post.id === like.post_id ? {...post, likes: post.likes.filter(l => l.id !== like.id) } : post)})
  }

  @Action(Post.AddComment)
  protected async addComment (ctx: LocalStateContext, action: Post.AddComment): Promise<void> {
    const { comment } = action;
    ctx.patchState({posts : ctx.getState().posts.map(post =>
        post.id === comment.post_id ? {...post, comments: [comment, ... post.comments] } : post)})
  }
}
