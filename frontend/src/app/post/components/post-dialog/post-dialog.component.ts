import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormActions} from "../../enums/form-actions.enum";
import {HttpClient} from "@angular/common/http";
import {PostModel} from "../../models/postModel.interface";
import {environment} from "../../../../environments/environment";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Select} from "@ngxs/store";
import {AuthState} from "../../../auth/state/auth-state";
import {Observable} from "rxjs";
import {ProfileModel} from "../../../auth/models/profileModel.interface";
import {FileState} from "../../../file/state/file-state";
import {FileUploadModel} from "../../../file/models/fileUploadModel.interface";
import {
  ProseMirrorEditorComponent
} from "../../../shared/prosemirror/components/prose-mirror-editor/prose-mirror-editor.component";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit{

  @ViewChild('editor') editor: ProseMirrorEditorComponent | undefined;

  @Input() selectedId = "";

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;
  @Select(FileState.filesData) files$!: Observable<FileUploadModel[]> ;


  actionButton: FormActions = FormActions.Create;
  uploadEnabled : boolean = false;
  existingFiles : boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private http: HttpClient) {
    this.form = this.fb.group({
      content: [''],
    })
  }

  ngOnInit(): void {
    this.checkAction();
    this.files$.subscribe(files => {
      this.existingFiles = files?.length > 0;
    });
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
      if (this.editor) {
        this.editor.focus();
      }
    })();
  }

  checkAction() {
    if(this.selectedId) {
      this.actionButton = FormActions.Update;
      this.patchDataValues()
    }
  }

  patchDataValues () {
    this.http.get(`${environment.apiURL}/posts/${this.selectedId}`)
      .subscribe({
        next : value => {
          this.form.setValue(value as PostModel);
        }
      })
  }

  save() {
    const content = JSON.stringify(this.editor?.getContent() ?? "");
    this.ref.close(content);
  }

  protected readonly FormActions = FormActions;
  isEmptyMessage(): boolean {
    return !(this.existingFiles || !(this.editor?.isEmpty() ?? true));
  }

  showUpload() {
    this.uploadEnabled = true;
  }

  closeUpload() {
    this.uploadEnabled = false;
  }
}
