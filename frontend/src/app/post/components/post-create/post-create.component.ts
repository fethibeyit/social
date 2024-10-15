import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Post} from "../../state/post-actions";
import {AppFile} from "../../../file/state/file-actions";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PostDialogComponent} from "../post-dialog/post-dialog.component";
import {PostModel} from "../../models/postModel.interface";
import {AuthState} from "../../../auth/state/auth-state";
import {Observable} from "rxjs";
import {ProfileModel} from "../../../auth/models/profileModel.interface";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  providers: [DialogService]
})
export class PostCreateComponent implements OnInit, OnDestroy{

  ref: DynamicDialogRef | undefined;

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;
  firstname : string = "";

  constructor(private store : Store, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if(profile) this.firstname = profile.fullname.split(" ")[0];
    });
  }

  // formAction(data: {value: any; action: FormActions}) {
  //   if(data.action === FormActions.Create){
  //     this.store.dispatch(new Post.Create(data.value));
  //     this.store.dispatch(new AppFile.UploadAll());
  //   } else if (data.action === FormActions.Update){
  //     this.store.dispatch(new Post.Update(data.value));
  //   }
  // }

  createPost() {
    this.ref = this.dialogService.open(PostDialogComponent, {
      header: 'Créer une publication',
      contentStyle: { overflow: 'auto' },
    });

    this.ref.onClose.subscribe((data: string) => {
      if (data) {
        let post  = {content: data} as PostModel;
        this.store.dispatch(new Post.Create(post));
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
