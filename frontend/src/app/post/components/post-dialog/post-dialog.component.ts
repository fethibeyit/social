import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PostModel} from "../../models/postModel.interface";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {CommentCreateModel} from "../../../comment/models/commentCreateModel.interface";
import {Comment} from "../../../comment/state/comment-actions";
import {Select, Store} from "@ngxs/store";
import {
  ProseMirrorEditorComponent
} from "../../../shared/prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";
import {PostState} from "../../state/post-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editor: ProseMirrorEditorComponent | undefined;

  @Select(PostState.posts) posts$!: Observable<PostModel[]> ;

  post!: PostModel;
  postId!: string;

  constructor(public config: DynamicDialogConfig, private store: Store) {
    this.postId = config.data.post.id;
  }

  ngOnInit(): void {
    this.posts$.subscribe(posts => {
      if(this.postId){
        this.post = posts.find(p => p.id == this.postId)!;
      }
    });
  }

  ngAfterViewInit(): void {
    console.log("editor", this.editor);
    setTimeout(() => {
      this.editor?.focus();
    }, 200);
  }

  addComment() {
    const commentContent = JSON.stringify(this.editor?.getContent() ?? "");
    const comment : CommentCreateModel = {content: commentContent,post_id: this.post.id, tags: []};
    this.store.dispatch(new Comment.Create(comment));
    this.editor?.clear();
  }

  isEmpty() :boolean {
    return this.editor?.isEmpty() ?? true;
  }

  comment() {
    this.editor?.focus();
  }


}
