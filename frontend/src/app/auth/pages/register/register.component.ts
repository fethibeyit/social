import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Select} from "@ngxs/store";
import {AuthState} from "../../state/auth-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Select(AuthState.loading) loading$!: Observable<boolean>;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
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
    console.log(this.form);
  }

}
