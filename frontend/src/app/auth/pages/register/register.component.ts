import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../state/auth-state";
import {Observable} from "rxjs";
import {AppUserCreateModel} from "../../models/appUserCreateModel.interface";
import {Auth} from "../../state/auth-actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Select(AuthState.loading) loading$!: Observable<boolean>;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullname: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      dateOfBirth: [''],
      sex: [''],
    })
  }



  submit() {
    let appuser : AppUserCreateModel = {
      fullname : this.form.value["fullname"],
      email: this.form.value["email"],
      password: this.form.value["password"]
    }
    this.store.dispatch(new Auth.CreateUser(appuser)).subscribe(()=>
        this.router.navigate(['/login'])
    );
  }

}
