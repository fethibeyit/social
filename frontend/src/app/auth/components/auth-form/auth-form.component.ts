import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Select} from "@ngxs/store";
import {AuthState} from "../../state/auth-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  @Output() submitEmitter = new EventEmitter();

  @Select(AuthState.loading) loading$!: Observable<boolean>;
  @Select(AuthState.error) error$!: Observable<string | null>;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    })

  }

  ngOnInit(): void {
  }

  submit() {
    this.submitEmitter.emit(this.form.value);
  }

}
