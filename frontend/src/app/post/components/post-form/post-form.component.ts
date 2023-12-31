import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormActions} from "../../enums/form-actions.enum";
import {HttpClient} from "@angular/common/http";
import {PostModel} from "../../models/postModel.interface";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit{

  @Input() selectedId = "";
  @Input() actionButton: FormActions = FormActions.Create;
  @Output() action = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  emitAction() {
    this.action.emit({value: this.form.value, action: this.actionButton})
  }

  clear() {
    this.form.reset();
  }

  protected readonly FormActions = FormActions;
}
