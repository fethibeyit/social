import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormActions} from "../../enums/form-actions.enum";
import {Store} from "@ngxs/store";
import {Post} from "../../state/post-actions";
import {AppFile} from "../../../file/state/file-actions";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PostDialogComponent} from "../post-dialog/post-dialog.component";
import {PostModel} from "../../models/postModel.interface";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  providers: [DialogService]
})
export class PostCreateComponent implements OnInit, OnDestroy{

  ref: DynamicDialogRef | undefined;
  constructor(private store : Store, public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  formAction(data: {value: any; action: FormActions}) {
    if(data.action === FormActions.Create){
      this.store.dispatch(new Post.Create(data.value));
      this.store.dispatch(new AppFile.UploadAll());
    } else if (data.action === FormActions.Update){
      this.store.dispatch(new Post.Update(data.value));
    }
  }

  createPost() {
    this.ref = this.dialogService.open(PostDialogComponent, {
      header: 'Ajouter une publication',
      contentStyle: { overflow: 'auto' },
    });

    this.ref.onClose.subscribe((data: PostModel) => {
      if (data) {
        this.store.dispatch(new Post.Create(data));
        this.store.dispatch(new AppFile.UploadAll());
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
