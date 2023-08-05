import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.interface";
import {TableActions} from "../../enums/table-actions.enum";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  @Input() headers: Array<{headerName: string, fieldName: keyof Post}> = [];
  @Input() posts: Array<Post> = [];
  @Output() post = new EventEmitter<{post: Post, action :TableActions}>();
  headerFields: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectPost(post: Post, action: TableActions) {
    this.post.emit({post, action});
  }

}
