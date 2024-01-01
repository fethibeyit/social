import {Component, Input, ViewChild} from '@angular/core';

import {Store} from "@ngxs/store";
import {Comment} from "../../state/comment-actions";
import {CommentCreateModel} from "../../models/commentCreateModel.interface";
import {ProseMirrorEditorComponent} from "../../../core/prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";
import {CommentModel} from "../../models/commentModel.interface";
@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() postId! : string;

  @Input() comments : CommentModel[] = [];

  @ViewChild(ProseMirrorEditorComponent)
  public proseMirrorComponent!: ProseMirrorEditorComponent;

  constructor(private store: Store) {
  }
  addComment() {
    if(!this.proseMirrorComponent.isEmpty()){
      const commentContent = JSON.stringify(this.proseMirrorComponent.getContent());
      const comment : CommentCreateModel = {content: commentContent,post_id: this.postId, tags: []};
      this.store.dispatch(new Comment.Create(comment));
    }
  }

}
