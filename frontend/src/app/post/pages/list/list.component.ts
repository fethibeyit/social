import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.interface";
import {HttpClient} from "@angular/common/http";
import {CommandBarActions} from "../../enums/command-bar-actions.enum";
import {Router} from "@angular/router";
import {TableActions} from "../../enums/table-actions.enum";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  posts : Post[] = [];
  headers: {headerName: string, fieldName: keyof Post}[] = [
    {headerName: "Title", fieldName: "title"},
    {headerName: "Content", fieldName: "content"}
  ]
  constructor(private http:HttpClient, private router:Router ) {
  }

  ngOnInit(): void {
    console.log("get posts");
    this.getPosts();
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
    this.router.navigate(['posts', 'form', data.post.id]);
  }
}
