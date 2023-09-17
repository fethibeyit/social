import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {TableActions} from "../../enums/table-actions.enum";
import {Observable, of} from "rxjs";
import {Select} from "@ngxs/store";
import {PostState} from "../../state/post-state";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{

  @Input() headers: Array<{headerName: string, fieldName: keyof PostModel}> = [];
  @Input() posts$: Observable<ReadonlyArray<PostModel>> = of([]);
  @Output() post = new EventEmitter<{post: PostModel, action :TableActions}>();
  headerFields: string[] = [];

  @Select(PostState.selectedPost) selected$!: Observable<PostModel | null>;
  @Select(PostState.deleteLoading) deleteLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectPost(post: PostModel, action: TableActions) {
    this.post.emit({post, action});
  }

}
