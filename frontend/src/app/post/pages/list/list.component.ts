import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.interface";
import {HttpClient} from "@angular/common/http";

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
  constructor(private http:HttpClient) {
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

}
