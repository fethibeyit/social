import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  posts : Post[] = [];
  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
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
