import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.interface";
import {TableActions} from "../../enums/table-actions.enum";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {selectDeleteLoading, selectSelected} from "../../state/post-selectors";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  @Input() headers: Array<{headerName: string, fieldName: keyof Post}> = [];
  @Input() posts$: Observable<ReadonlyArray<Post>> = of([]);
  @Output() post = new EventEmitter<{post: Post, action :TableActions}>();
  headerFields: string[] = [];

  selected$ = this.store.select(selectSelected());
  deleteLoading$ = this.store.select(selectDeleteLoading());

  constructor(private store : Store) { }

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
