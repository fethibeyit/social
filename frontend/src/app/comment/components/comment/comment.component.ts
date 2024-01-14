import {Component, Input} from '@angular/core';
import {Store} from "@ngxs/store";
import {Comment} from "../../state/comment-actions";
import {CommentCreateModel} from "../../models/commentCreateModel.interface";
import {CommentModel} from "../../models/commentModel.interface";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() postId! : string;

  @Input() comments : CommentModel[] = [];

  constructor(private store: Store) {
  }
  addComment(content : string) {
      const commentContent = JSON.stringify(content);
      const comment : CommentCreateModel = {content: commentContent,post_id: this.postId, tags: []};
      this.store.dispatch(new Comment.Create(comment));
  }

}
