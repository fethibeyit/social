import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.interface";
import {HttpClient} from "@angular/common/http";
import {CommandBarActions} from "../../enums/command-bar-actions.enum";
import {Router} from "@angular/router";
import {TableActions} from "../../enums/table-actions.enum";
import {AppState} from "../../../state/app-state";
import {Store} from "@ngrx/store";
import {selectPosts} from "../../state/post-selectors";
import {PostActions} from "../../state/post-actions";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  posts : Post[] = [];
  posts$ = this.store.select(selectPosts());

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
    this.store.dispatch({type: PostActions.GET_POST_LIST});
    this.posts$.subscribe(data => this.posts = data as Post[]);
  }

  getPosts(){
    this.http.get("http://localhost:8080/api/posts")
      .subscribe({
        next : value => {
          this.posts=value as Post[];
        }
      })
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
      this.http.delete("http://localhost:8080/api/posts/" + data.post.id)
        .subscribe({
          next : value => {
            this.posts = this.posts.filter(x => x.id !== data.post.id );
          }
        })
    }
  }
}
