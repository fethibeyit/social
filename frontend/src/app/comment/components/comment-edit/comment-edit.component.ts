import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {Store} from "@ngxs/store";
import {Comment} from "../../state/comment-actions";
import {CommentCreateModel} from "../../models/commentCreateModel.interface";
import {ProseMirrorComponent} from "../prose-mirror/prose-mirror.component";
import {CommentModel} from "../../models/commentModel.interface";
@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent {

  @Input() postId! : string;

  @Input() comments : CommentModel[] = [];

  @ViewChild(ProseMirrorComponent)
  private proseMirrorComponent!: ProseMirrorComponent;

  ordoredComment : CommentModel[] = [];

  constructor(private store: Store) {
  }
  addComment() {
    const commentContent = JSON.stringify(this.proseMirrorComponent.getContent());
    const comment : CommentCreateModel = {content: commentContent,post_id: this.postId, tags: []};
    this.store.dispatch(new Comment.Create(comment));
  }

  // ngOnInit(): void {
  //   console.log(new Date(this.comments[0].createdAt).getTime())
  //   this.ordoredComment = this.comments.sort(
  //   (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );
  //   console.log(this.ordoredComment)
  // }
}
