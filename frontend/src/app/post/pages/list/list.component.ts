import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.interface";
import {HttpClient} from "@angular/common/http";
import {CommandBarActions} from "../../enums/command-bar-actions.enum";
import {Router} from "@angular/router";
import {TableActions} from "../../enums/table-actions.enum";
import {AppState} from "../../../state/app-state";
import {Store} from "@ngrx/store";
import {
  selectDeleteProcess,
  selectGetProcess,
  selectPosts
} from "../../state/post-selectors";
import {PostActions} from "../../state/post-actions";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  posts$ = this.store.select(selectPosts());
  getProcess$ = this.store.select(selectGetProcess());
  deleteProcess = this.store.select(selectDeleteProcess());


  headers: {headerName: string, fieldName: keyof Post}[] = [
    {headerName: "Title", fieldName: "title"},
    {headerName: "Content", fieldName: "content"}
  ]
  constructor(
    private http:HttpClient,
    private router:Router ,
    private store: Store<AppState>,
    ) {}

  ngOnInit(): void {
    this.store.dispatch(PostActions.getPostList());
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

  selectPost(data: {post: Post; action: TableActions}) {
    if(data.action === TableActions.View){
      this.router.navigate(['posts', 'form', data.post.id]);
    } else {
      this.store.dispatch(PostActions.deletePost({post : data.post}));
    }
  }
}
