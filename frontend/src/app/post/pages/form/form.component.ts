import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormActions} from "../../enums/form-actions.enum";
import {Observable} from "rxjs";
import {CanComponentDeactivate} from "../../../core/guards/form.guard";
import {Store} from "@ngxs/store";
import {Post} from "../../state/post-actions";
import {TranslateService} from "@ngx-translate/core";
import {AppFile} from "../../../file/state/file-actions";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, CanComponentDeactivate{
  id = "";
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store : Store,
              private translate : TranslateService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  formAction(data: {value: any; action: FormActions}) {
    if(data.action === FormActions.Create){
      this.store.dispatch(new Post.Create(data.value));
      this.store.dispatch(new AppFile.UploadAll());
    } else if (data.action === FormActions.Update){
      this.store.dispatch(new Post.Update(data.value));
    }
    this.router.navigate((["posts"]));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if(this.id) {
      this.translate.get('Are you sure?').subscribe( msg => window.confirm(msg) );
    }
    return true;
  }

  upload(): void {
  }
}
