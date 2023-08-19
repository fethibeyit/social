import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormActions} from "../../enums/form-actions.enum";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/post.interface";

import {PostActions} from "../../state/post-actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {CanComponentDeactivate} from "../../../core/guards/form.guard";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, CanComponentDeactivate{
  id = "";
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store : Store) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  formAction(data: {value: any; action: FormActions}) {
    if(data.action === FormActions.Create){
      this.store.dispatch(PostActions.createPost({post: data.value}));
    } else if (data.action === FormActions.Update){
      this.store.dispatch(PostActions.updatePost({post: data.value}));
    }
    this.router.navigate((["posts"]));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const confirmation = window.confirm('Are you sure?');
    return confirmation;
  }
}
