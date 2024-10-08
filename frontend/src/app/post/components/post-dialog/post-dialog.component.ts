import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit{

  @Input() selectedId = "";

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;


  actionButton: FormActions = FormActions.Create;
  uploadEnabled : boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private http: HttpClient) {
    this.form = this.fb.group({
      content: [''],
    })
  }

  ngOnInit(): void {
    this.checkAction();
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
    this.ref.close(this.form.value);
    //this.action.emit({value: this.form.value, action: this.actionButton})
  }

  clear() {
    this.form.reset();
  }

  protected readonly FormActions = FormActions;
  isEmptyMessage(): boolean {
    return true;
  }

  showUpload() {
    this.uploadEnabled = true;
  }
}
