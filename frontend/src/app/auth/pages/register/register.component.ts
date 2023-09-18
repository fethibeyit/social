import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../state/auth-state";
import {Observable} from "rxjs";
import {AppUserCreateModel} from "../../models/appUserCreateModel.interface";
import {Auth} from "../../state/auth-actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Select(AuthState.loading) loading$!: Observable<boolean>;

  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store ) {
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      dateOfBirth: [''],
      sex: [''],
    })
  }



  submit() {
    let appuser : AppUserCreateModel = {
      firstname : this.form.value["firstname"],
      lastname: this.form.value["lastname"],
      email: this.form.value["email"],
      password: this.form.value["password"]
    }

    console.log(appuser);

    this.store.dispatch(new Auth.CreateUser(appuser));


  }

}
