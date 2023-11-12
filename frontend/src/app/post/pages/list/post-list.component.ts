import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {HttpClient} from "@angular/common/http";
import {CommandBarActions} from "../../enums/command-bar-actions.enum";
import {Router} from "@angular/router";
import {TableActions} from "../../enums/table-actions.enum";
import {PostState} from "../../state/post-state";
import {Observable} from "rxjs";
import { Store } from '@ngxs/store';
import {Select} from "@ngxs/store";
import {Post} from "../../state/post-actions";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{

  @Select(PostState.posts) posts$!: Observable<PostModel[]> ;
  @Select(PostState.loading) loading$!: Observable<boolean> ;


  headers: {headerName: string, fieldName: keyof PostModel}[] = [
    {headerName: "Content", fieldName: "content"}
  ]
  constructor(
    private http:HttpClient,
    private router:Router ,
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.store.dispatch(new Post.GetList());
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch(action) {
      case CommandBarActions.Create: {
        this.router.navigate(["posts", "form"]);
        return;
      }
      case CommandBarActions.DeleteAll: {
        return;
      }
      default: ""
    }
  }

  selectPost(data: {post: PostModel; action: TableActions}) {
    if(data.action === TableActions.View){
      this.router.navigate(['posts', 'form', data.post.id]);
    } else {
      this.store.dispatch(new Post.Delete(data.post));
    }
  }


}
