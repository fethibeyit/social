import {Component, Input, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {Comment} from "../../state/comment-actions";
import {CommentCreateModel} from "../../models/commentCreateModel.interface";
import {CommentModel} from "../../models/commentModel.interface";
import {
  ProseMirrorEditorComponent
} from "../../../shared/prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @ViewChild('editor') editor!: ProseMirrorEditorComponent;

  @Input() postId! : string;

  @Input() comments : CommentModel[] = [];

  constructor(private store: Store) {
  }
  addComment() {
      const commentContent = JSON.stringify(this.editor.getContent());
      const comment : CommentCreateModel = {content: commentContent,post_id: this.postId, tags: []};
      this.store.dispatch(new Comment.Create(comment));
  }

  isEmpty() :boolean {
    return this.editor?.isEmpty() ?? true;
  }
}
